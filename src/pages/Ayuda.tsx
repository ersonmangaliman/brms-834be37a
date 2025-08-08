import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Gift, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Ayuda = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipient: "",
    type: "",
    amount: "",
    status: "Pending",
    notes: "",
  });
  
  // Mock ayuda data - using state to allow adding new records
  const [ayudaRecords, setAyudaRecords] = useState([
    {
      id: 1,
      recipient: "Juan Dela Cruz",
      type: "Food Package",
      amount: 1500,
      dateDistributed: "2024-07-20",
      status: "Distributed",
      notes: "Regular monthly assistance"
    },
    {
      id: 2,
      recipient: "Maria Santos",
      type: "Medical Assistance",
      amount: 3000,
      dateDistributed: "2024-07-18",
      status: "Distributed",
      notes: "Emergency medical aid"
    },
    {
      id: 3,
      recipient: "Pedro Garcia",
      type: "Education Allowance",
      amount: 2000,
      dateDistributed: "2024-07-15",
      status: "Pending",
      notes: "School supplies assistance"
    }
  ]);
  
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitAyuda = () => {
    if (!formData.recipient || !formData.type || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create new ayuda record
    const newRecord = {
      id: ayudaRecords.length + 1,
      recipient: formData.recipient,
      type: formData.type,
      amount: parseInt(formData.amount),
      dateDistributed: new Date().toISOString().split('T')[0],
      status: formData.status,
      notes: formData.notes
    };

    // Add to records list
    setAyudaRecords(prev => [newRecord, ...prev]);

    toast({
      title: "Ayuda Record Added",
      description: `New ${formData.type} record for ${formData.recipient} has been created`,
    });

    // Reset form and close dialog
    setFormData({ recipient: "", type: "", amount: "", status: "Pending", notes: "" });
    setIsDialogOpen(false);
  };

  const filteredRecords = ayudaRecords.filter(record =>
    record.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ayuda Distribution</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Ayuda Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Ayuda Record</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipient" className="text-right">
                  Recipient
                </Label>
                <Input
                  id="recipient"
                  value={formData.recipient}
                  onChange={(e) => handleInputChange("recipient", e.target.value)}
                  className="col-span-3"
                  placeholder="Enter recipient name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select ayuda type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food Package">Food Package</SelectItem>
                    <SelectItem value="Medical Assistance">Medical Assistance</SelectItem>
                    <SelectItem value="Education Allowance">Education Allowance</SelectItem>
                    <SelectItem value="Emergency Relief">Emergency Relief</SelectItem>
                    <SelectItem value="Senior Citizen Aid">Senior Citizen Aid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="col-span-3"
                  placeholder="Enter amount"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Distributed">Distributed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="col-span-3"
                  placeholder="Additional notes (optional)"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitAyuda}>
                Add Record
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distributed</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱6,500</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recipients</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Active beneficiaries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Awaiting distribution</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Ayuda Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by recipient or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Ayuda Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ayuda Records ({filteredRecords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.recipient}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>₱{record.amount.toLocaleString()}</TableCell>
                  <TableCell>{record.dateDistributed}</TableCell>
                  <TableCell>
                    <Badge variant={record.status === "Distributed" ? "default" : "secondary"}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ayuda;