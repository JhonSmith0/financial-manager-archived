import currentUser from "@/state/currentUser";
import { useHookstate } from "@hookstate/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledSideBar = styled.div`
  flex: 0.33;
  border-right: solid 1px #222;

  --inline-padding: 1.2rem;

  display: grid;
  grid-template-rows: auto 1fr;

  header {
    border-bottom: solid 1px #222;
    padding: 1.2rem;
    padding-inline: var(--inline-padding);
  }

  nav {
    ul {
      list-style-type: none;
      height: 100%;

      display: flex;
      flex-direction: column;

      li {
        height: max-content;
        &:hover {
          background: #222;
        }
        cursor: pointer;

        &:last-child {
          margin-top: auto;
          a {
            padding-block: 2rem;
          }
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          color: inherit;

          padding: var(--inline-padding);
        }
      }
    }
  }
`;
export function SideBar() {
  const user = useHookstate(currentUser);
  const values = user.get();

  return (
    <StyledSideBar>
      <header>
        <h2>Hello, {values.name}</h2>
      </header>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"accounts"}>Accounts</Link>
          </li>
          <li>
            <Link to={"/login"}>Log-out</Link>
          </li>
        </ul>
      </nav>
    </StyledSideBar>
  );
}
