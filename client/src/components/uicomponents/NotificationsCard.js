import React, { useEffect, useState } from "react";
import NotificationDetailsCard from "./NotDetailsCard";
import { session } from "../../utils/globalutils";

const API = process.env.REACT_APP_API;

const NotificationCard = ({ onClose }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [department, setDepartment] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [totalCount, setTotalCount]= useState('');
  const [loading, setLoading] = useState(true);

      
    async function fetchNotifications() {
      try {
        const sess = await session();
        setDepartment(sess.departmentId);

        if (!sess.departmentId) return;

        const response = await fetch(`${API}/getNotifications`);
        const data = await response.json();

        if (data.success) {
          const formatted = data.notifications.map(n => ({
            notificationID: n.ID,
            title: n.title,
            message: n.message,
            count: n.count,
            time: new Date(n.createdAt).toLocaleString(),
            icon: "bx-bell",
            read: n.read || false,
          }));

          setNotifications(formatted);
          setTotalCount(data.count || formatted.length)
        } else {
          setNotifications([]);
          console.log(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationID) => {
  try {
    const response = await fetch(`${API}/markAsRead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationID }),
    });

    const data = await response.json();
    if (data.success) {
      setNotifications(prev =>
        prev.map(n =>
          n.notificationID === notificationID ? { ...n, read: true } : n
        )
      );

      fetchNotifications(); 
    }
  } catch (err) {
    console.error("Failed to mark as read:", err);
  }
};


const markAllAsRead = async () => {
  try {
    const response = await fetch(`${API}/markAllAsRead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));

      fetchNotifications();
    }
  } catch (err) {
    console.error("Failed to mark all as read:", err);
  }
};


  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-50">
        <div className="bg-white w-80 sm:w-96 h-auto my-6 mr-6 rounded-2xl shadow-xl overflow-hidden">

          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h2 className="font-semibold text-lg">Notifications <span className="text-red-500">({totalCount})</span></h2>
            <button onClick={onClose}>
              <i className="bx bx-x text-2xl text-gray-600 hover:text-gray-900"></i>
            </button>
          </div>

          <div className="flex justify-end px-5 py-2 border-b gap-2">
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:underline"
            >
              Mark All as Read
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <p className="p-5 text-sm text-gray-500 text-center">Loading...</p>
            ) : notifications.length === 0 ? (
              <p className="p-5 text-sm text-gray-500 text-center">
                No new notifications
              </p>
            ) : (
              notifications.map((note) => (
                <div
                  key={note.notificationID}
                  className={`px-5 py-4 border-b hover:bg-gray-50 transition cursor-pointer ${note.read ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    setSelectedNotification(note);
                    if (!note.read) markAsRead(note.notificationID); // auto-mark as read on open
                  }}
                >
                  <div className="flex items-start gap-3">
                    <i className={`bx ${note.icon} text-xl text-blue-600`}></i>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{note.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{note.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{note.time}</p>
                    </div>

                    {!note.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          markAsRead(note.notificationID);
                        }}
                        className="ml-2 text-xs text-blue-600 hover:underline"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedNotification && (
        <NotificationDetailsCard
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </>
  );
};

export default NotificationCard;
