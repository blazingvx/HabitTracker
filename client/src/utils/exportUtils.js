// CSV Export
export const exportToCSV = (habits) => {
  if (habits.length === 0) {
    alert("No habits to export!");
    return;
  }

  const headers = ["Habit Name", "Total Completions", "Current Streak", "Last Completed"];
  
  const rows = habits.map(habit => [
    habit.name,
    habit.completedDates?.length || 0,
    getStreak(habit),
    habit.completedDates?.length > 0 
      ? new Date(habit.completedDates[habit.completedDates.length - 1]).toLocaleDateString()
      : "Never"
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  downloadFile(csvContent, `habit-tracker-${new Date().toISOString().split('T')[0]}.csv`, "text/csv");
};

// PDF Export using HTML2Canvas and jsPDF (lightweight approach)
export const exportToPDF = async (habits) => {
  if (habits.length === 0) {
    alert("No habits to export!");
    return;
  }

  try {
    // Dynamically import jsPDF
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;
    const lineHeight = 10;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // Title
    doc.setFontSize(20);
    doc.setFont(undefined, "bold");
    doc.text("Habit Tracker Report", margin, yPosition);
    yPosition += 15;

    // Export date
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    const exportDate = new Date().toLocaleDateString();
    doc.text(`Generated on: ${exportDate}`, margin, yPosition);
    yPosition += 10;

    // Summary
    doc.setFont(undefined, "bold");
    doc.text("Summary", margin, yPosition);
    yPosition += 7;
    doc.setFont(undefined, "normal");
    doc.setFontSize(9);
    
    const totalCompletions = habits.reduce((sum, h) => sum + (h.completedDates?.length || 0), 0);
    doc.text(`Total Habits: ${habits.length}`, margin, yPosition);
    yPosition += 6;
    doc.text(`Total Completions: ${totalCompletions}`, margin, yPosition);
    yPosition += 10;

    // Habits details
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text("Habits Details", margin, yPosition);
    yPosition += 8;

    doc.setFontSize(9);
    doc.setFont(undefined, "normal");

    habits.forEach((habit) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }

      // Habit name
      doc.setFont(undefined, "bold");
      doc.text(`• ${habit.name}`, margin, yPosition);
      yPosition += 7;

      // Habit stats
      doc.setFont(undefined, "normal");
      doc.setFontSize(8);
      const completions = habit.completedDates?.length || 0;
      const streak = getStreak(habit);
      const lastCompleted = habit.completedDates?.length > 0 
        ? new Date(habit.completedDates[habit.completedDates.length - 1]).toLocaleDateString()
        : "Never";

      doc.text(`  Completions: ${completions}  |  Streak: ${streak}  |  Last: ${lastCompleted}`, margin + 5, yPosition);
      yPosition += 7;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128);
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    }

    // Save PDF
    const filename = `habit-tracker-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    alert("Failed to export PDF. Please install jsPDF: npm install jspdf");
  }
};

// Helper function to calculate streak
const getStreak = (habit) => {
  if (!habit.completedDates || habit.completedDates.length === 0) return 0;
  
  let streak = 0;
  const dates = habit.completedDates
    .map(d => new Date(d))
    .sort((a, b) => b - a);
  
  const today = new Date();
  let currentDate = new Date(today);
  
  for (let date of dates) {
    const dateStr = date.toDateString();
    const currentStr = currentDate.toDateString();
    
    if (dateStr === currentStr) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (currentDate > date) {
      break;
    }
  }
  
  return streak;
};

// Generic file download helper
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
