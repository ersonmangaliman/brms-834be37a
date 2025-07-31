import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, BarChart3, Users, Gift } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reportType, setReportType] = useState("");
  const { toast } = useToast();

  const handleGenerateReport = () => {
    if (!reportType) {
      toast({
        title: "Report Type Required",
        description: "Please select a report type first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Generating Report",
      description: `Generating ${reportType} report...`,
    });
  };

  const generateSampleData = (reportType: string) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    switch (reportType) {
      case "residents":
        return [
          ["Name", "Age", "Address", "Phone", "Status", "Date Registered"],
          ["Juan Dela Cruz", "35", "Block 1 Lot 5", "09123456789", "Active", "2024-01-15"],
          ["Maria Santos", "28", "Block 2 Lot 10", "09987654321", "Active", "2024-02-20"],
          ["Pedro Garcia", "42", "Block 3 Lot 8", "09456789123", "Inactive", "2023-12-10"],
          ["Ana Rodriguez", "31", "Block 1 Lot 12", "09112233445", "Active", "2024-03-05"],
          ["Carlos Mendoza", "29", "Block 4 Lot 3", "09556677889", "Active", "2024-01-28"]
        ];
      case "ayuda":
        return [
          ["Recipient", "Type", "Amount", "Date Distributed", "Status", "Notes"],
          ["Juan Dela Cruz", "Food Package", "1500", "2024-07-20", "Distributed", "Regular monthly assistance"],
          ["Maria Santos", "Medical Assistance", "3000", "2024-07-18", "Distributed", "Emergency medical aid"],
          ["Pedro Garcia", "Education Allowance", "2000", "2024-07-15", "Pending", "School supplies assistance"],
          ["Ana Rodriguez", "Food Package", "1500", "2024-07-22", "Distributed", "Monthly food aid"],
          ["Carlos Mendoza", "Medical Assistance", "2500", "2024-07-19", "Distributed", "Medicine assistance"]
        ];
      case "demographics":
        return [
          ["Age Group", "Male", "Female", "Total", "Percentage"],
          ["0-18", "145", "138", "283", "23%"],
          ["19-35", "201", "195", "396", "32%"],
          ["36-60", "156", "162", "318", "26%"],
          ["60+", "89", "95", "184", "15%"],
          ["Unknown", "12", "15", "27", "2%"]
        ];
      default:
        return [
          ["Category", "Count", "Amount", "Percentage"],
          ["Total Residents", "1234", "-", "100%"],
          ["Active Ayuda Recipients", "89", "₱125,500", "7.2%"],
          ["New Registrations (This Month)", "23", "-", "1.9%"],
          ["Reports Generated", "45", "-", "-"]
        ];
    }
  };

  const downloadCSV = (data: string[][], filename: string) => {
    const csvContent = data.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadReport = (reportName: string) => {
    let reportType = "summary";
    let filename = `${reportName.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;
    
    if (reportName.toLowerCase().includes("residents")) {
      reportType = "residents";
    } else if (reportName.toLowerCase().includes("ayuda")) {
      reportType = "ayuda";
    } else if (reportName.toLowerCase().includes("demographics")) {
      reportType = "demographics";
    }
    
    const sampleData = generateSampleData(reportType);
    downloadCSV(sampleData, filename);
    
    toast({
      title: "Report Downloaded",
      description: `${reportName} has been downloaded successfully`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <Button onClick={handleGenerateReport}>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residents">Residents Summary</SelectItem>
                  <SelectItem value="ayuda">Ayuda Distribution</SelectItem>
                  <SelectItem value="demographics">Demographics Report</SelectItem>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date From</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date To</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => handleDownloadReport("Monthly Residents Report")}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs text-center">Monthly Residents Report</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => handleDownloadReport("Ayuda Distribution Report")}
          >
            <Gift className="h-6 w-6" />
            <span className="text-xs text-center">Ayuda Distribution Report</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => handleDownloadReport("Demographics Summary")}
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs text-center">Demographics Summary</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => handleDownloadReport("Annual Report")}
          >
            <FileText className="h-6 w-6" />
            <span className="text-xs text-center">Annual Report</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Monthly Residents Report - January 2024", date: "2024-02-01", size: "2.3 MB" },
              { name: "Ayuda Distribution Summary - Q4 2023", date: "2024-01-15", size: "1.8 MB" },
              { name: "Demographics Report - December 2023", date: "2024-01-02", size: "945 KB" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">Generated on {report.date} • {report.size}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadReport(report.name)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;