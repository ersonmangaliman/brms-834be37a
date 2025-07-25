import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const Residents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock resident data
  const residents = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      age: 35,
      address: "Block 1 Lot 5",
      phone: "09123456789",
      status: "Active",
      dateRegistered: "2024-01-15"
    },
    {
      id: 2,
      name: "Maria Santos",
      age: 28,
      address: "Block 2 Lot 10",
      phone: "09987654321",
      status: "Active",
      dateRegistered: "2024-02-20"
    },
    {
      id: 3,
      name: "Pedro Garcia",
      age: 42,
      address: "Block 3 Lot 8",
      phone: "09456789123",
      status: "Inactive",
      dateRegistered: "2023-12-10"
    }
  ];

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Residents Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Resident
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Residents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Residents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resident Records ({filteredResidents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell className="font-medium">{resident.name}</TableCell>
                  <TableCell>{resident.age}</TableCell>
                  <TableCell>{resident.address}</TableCell>
                  <TableCell>{resident.phone}</TableCell>
                  <TableCell>
                    <Badge variant={resident.status === "Active" ? "default" : "secondary"}>
                      {resident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{resident.dateRegistered}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Residents;