import pool from '../../data/dbconnector.js';

const getNotification = async (departmentID) => {
  if (!departmentID) {
    return {
      success: false,
      message: "Department was not found.",
    };
  }

  try {
    const sql = 'SELECT * FROM notifications WHERE targetDepartment = ? AND isRead = ?';
    const [result] = await pool.query(sql, [departmentID, 0]);

    if (result.length > 0) {
      const notifications = result.map(notification => ({
        notificationID: notification.ID,
        departmentID: notification.targetDepartment,
        notificationTitle: notification.title,
        notificationMessage: notification.message,
        notificationDate: notification.createdAt,
      }));

      return {
        success: true,
        message: "Notifications were found successfully.",
        notifications,
      };
    } else {
      console.log("Notifications were not found.");
      return {
        success: false,
        message: "This department has no notifications yet.",
      };
    }
  } catch (err) {
    console.error("Could not find notifications for this department:", err.message);
    return {
      success: false,
      message: "Database query failed.",
      error: err.message,
    };
  }
};

export default getNotification;
