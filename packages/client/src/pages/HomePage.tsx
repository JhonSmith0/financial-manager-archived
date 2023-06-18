import { SideBar, StyledSideBar } from "@/components/SideBar";
import { StyledBar, StyledHomeOutLet } from "@/components/styled";
import currentUser from "@/state/currentUser";
import { useHookstate } from "@hookstate/core";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const StyledHomePage = styled.div`
  display: grid;

  width: 100vw;
  height: 100vh;

  grid-template-columns: 1fr 3fr;
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

