import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Publications from "./pages/Publications";
import CV from "./pages/CV";
import Navigation from "./components/Navigation";
import Model from "./pages/Model";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/experience"} component={Experience} />
      <Route path={"/publications"} component={Publications} />
      <Route path={"/cv"} component={CV} />
      <Route path={"/model"} component={Model} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <footer className="border-t border-border py-8 mt-16">
              <div className="container">
                <p className="text-center text-muted-foreground text-sm">
                  © 2024 Itay Kadosh. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

