import FloatingCircles from "./components/FloatingCircles";

function App() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <FloatingCircles
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingCircles
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={2}
      />
      <FloatingCircles
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={5}
      />
    </div>
  );
}

export default App;
