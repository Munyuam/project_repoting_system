const getProgress = (status) => {
    switch (status) {
      case "Pending":
        return 25;
      case "workStartedStudio":
        return 50;
      case "WorkedStartedWorkshop":
        return 75;
      case "completed":
        return 100;
      default:
        return 0;
    }
};

const getStageName = (status) => {
    switch (status) {
      case "Pending":
        return "Pending - not approved";
      case "workStartedStudio":
        return "Approved - studio work started";
      case "WorkedStartedWorkshop":
        return "Inprogress- Workshop Work Started";
      case "completed":
        return "Completed";
      default:
        return "Unknown Stage";
    }
};

function viewStatus() {
    window.location.href = "/p/project-status";
}

function newproject() {
    window.location.href = "/p/addproject";
}

function dateFormat (date){
    const  d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}


module.exports = {getProgress, newproject, getStageName, dateFormat, viewStatus}

