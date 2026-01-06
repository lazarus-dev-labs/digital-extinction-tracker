import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Home from "./pages/Home";
import "./index.css";

export function App() {
  // return (
  //   <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
  //     <Card className="border-none">
  //       <CardHeader className="gap-4">
  //         <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
  //         <CardDescription>
  //           Edit{" "}
  //           <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">
  //             src/App.tsx
  //           </code>{" "}
  //           and save to test HMR
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <h4 className="text-5xl font-bold my-4 leading-tight">Sha cdn </h4>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
  return <Home />;
}

export default App;
