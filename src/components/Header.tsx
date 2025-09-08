import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between p-4 items-center max-w-[1280px] mx-auto">
        <div className="text-3xl font-bold">Commit &#10142; Content</div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
