import Button from "~/components/button";
import Dropzone from "~/components/dropzone";
import Loader from "~/components/loader";
import Stepper from "~/components/stepper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Dropzone /> */}
      <Button text="Submit" />
      {/* <Loader /> */}
    </main>
  );
}
