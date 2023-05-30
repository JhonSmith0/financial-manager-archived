import { SideBar } from "@/components/SideBar";
import currentUser from "@/state/currentUser";
import { useHookstate } from "@hookstate/core";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const StyledHomePage = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;
`;

export default function HomePage() {
  const user = useHookstate(currentUser);
  const values = user.get();

  return (
    <StyledHomePage>
      <SideBar />
      <Outlet />
    </StyledHomePage>
  );
}
