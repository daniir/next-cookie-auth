import { useRouter } from "next/navigation";

type ButtonProps = {
  path: string;
  color: string;
  name: string;
};

function NavigationButton({ path, color, name }: ButtonProps) {
  const router = useRouter();
  return (
    <button
      className={`block w-full ${color} rounded-md text-white font-bold p-3`}
      type="button"
      onClick={() => router.push(path)}
    >
      {name}
    </button>
  );
}

export default NavigationButton;
