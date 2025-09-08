import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import React from "react";

const LearningUnavailableAlert = () => {
  return (
    <Alert
      variant="destructive"
      className="bg-yellow-50 border-yellow-400 max-w-[45rem] mx-auto mt-4 flex flex-col items-center text-center space-y-2 
                 py-4 px-6 sm:px-4"
    >
      <AlertTriangle className="h-8 w-8 sm:h-6 sm:w-6 text-yellow-600" />
      <AlertTitle className="text-lg sm:text-base font-semibold text-yellow-800">
        Categorieën in ontwikkeling
      </AlertTitle>
      <AlertDescription className="text-yellow-700 text-sm sm:text-xs">
        We zijn bezig met het implementeren van de Scooter- en Motor-categorieën. Voorlopig is alleen Auto (B) beschikbaar.
      </AlertDescription>
    </Alert>
  );
};

export default LearningUnavailableAlert;
