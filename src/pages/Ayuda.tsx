import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Gift, Calendar } from "lucide-react";

const Ayuda = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock ayuda data
  const ayudaRecords = [
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
  ];

  const filteredRecords = ayudaRecords.filter(record =>
    record.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ayuda Distribution</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Ayuda Record
        </Button>
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