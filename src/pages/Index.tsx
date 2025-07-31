import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Gift, FileText, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Barangay Record Management System
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Digital solution for managing resident records, ayuda distribution, 
            and community data for Barangay Sta. Filomena
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate("/login")}>
              Access System
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToFeatures}>
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Resident Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive database of barangay residents with detailed profiles and status tracking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Gift className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Ayuda Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track and manage distribution of government assistance and community aid programs.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Document Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize and maintain important barangay documents and resident certificates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate detailed reports and visualize community data for better decision making.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <Card className="bg-muted/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Why Choose BRMS?</CardTitle>
            <CardDescription>Modern solution for traditional community management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Efficient</h3>
                <p className="text-muted-foreground">
                  Streamline administrative tasks and reduce paperwork with digital workflows.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Secure</h3>
                <p className="text-muted-foreground">
                  Protect sensitive resident data with modern security measures and access controls.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Transparent</h3>
                <p className="text-muted-foreground">
                  Maintain clear records and accountability in all barangay operations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
