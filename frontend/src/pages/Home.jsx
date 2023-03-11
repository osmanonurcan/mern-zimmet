import { useEffect, useState } from "react";
import styled from "styled-components";
import { getStats } from "../../axios";
import { PieChart } from "react-minimal-pie-chart";
import { AiFillPieChart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { LoadingContainer } from "../components/styles/LoadingContainer";

export const Home = () => {
  const [stats, setstats] = useState();

  const navigate = useNavigate();

  const data = [
    {
      title: "pending",
      value: stats?.tickets.pending,
      color: "#E38627",
    },
    {
      title: "processing",
      value: stats?.tickets.processing,
      color: "#C13C37",
    },
    {
      title: "done",
      value: stats?.tickets.done,
      color: "#6A2135",
    },
  ];

  const ticketsCount =
    stats?.tickets.pending + stats?.tickets.processing + stats?.tickets.done;

  useEffect(() => {
    const fetchStats = async () => {
      const statsData = await getStats();
      setstats(statsData?.data.stats);
    };

    fetchStats();
  }, []);

  if (stats == null) {
    return (
      <LoadingContainer>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </LoadingContainer>
    );
  }
  return (
    <S.DasboardContainer>
      <S.SectionContainer>
        <S.Devices onClick={() => navigate("/stock")}>
          <h2>Devices</h2>
          <h2>{stats?.devices}</h2>
        </S.Devices>
        <S.Owners>
          <h2>Owners</h2>
          <h2>{stats?.owners}</h2>
        </S.Owners>
        <S.Tickets onClick={() => navigate("/service")}>
          <h2>Tickets</h2>
          <h2>{ticketsCount}</h2>
          <S.Chart>
            <PieChart
              data={data}
              lineWidth={20}
              paddingAngle={18}
              rounded
              label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
              labelStyle={(index) => ({
                fill: data[index].color,
                fontSize: "0.5rem",
              })}
              labelPosition={70}
            />
            <S.ChartLabels>
              <S.PendingLabel>
                <i>
                  <AiFillPieChart />
                </i>
                <span>Pending</span>
              </S.PendingLabel>
              <S.ProcessingLabel>
                <i>
                  <AiFillPieChart />
                </i>
                <span>Processing</span>
              </S.ProcessingLabel>
              <S.DoneLabel>
                <i>
                  <AiFillPieChart />
                </i>
                <span>Done</span>
              </S.DoneLabel>
            </S.ChartLabels>
          </S.Chart>
        </S.Tickets>
      </S.SectionContainer>
    </S.DasboardContainer>
  );
};

const S = {};

S.ChartLabels = styled.div`
  position: absolute;
  top: 40%;
  left: 35%;
`;

S.DasboardContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    height: calc(100vh - 3rem);
  }
`;

S.PendingLabel = styled.div`
  color: ${({ theme }) => theme.pending};
`;
S.ProcessingLabel = styled.div`
  color: ${({ theme }) => theme.processing};
`;
S.DoneLabel = styled.div`
  color: ${({ theme }) => theme.done};
`;

S.SectionContainer = styled.section`
  width: 80%;
  height: 80%;

  & > div {
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.card};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    &:hover {
      h2 {
        font-size: 3.5rem;
      }
      & > div {
        transform: scale(1.05);
      }
    }

    h2 {
      transition: 0.5s;
      font-size: 3rem;
      margin: 2rem;
    }
  }
  @media (min-width: 768px) {
    display: grid;
    gap: 1rem;
    grid-template-areas:
      "devices tickets"
      "owners tickets";

    & > div {
      margin: 0;
    }
  }
`;

S.Chart = styled.div`
  display: flex;
  position: relative;
  transition: all 0.5s;
`;

S.Devices = styled.div`
  grid-area: devices;
`;
S.Owners = styled.div`
  grid-area: owners;
`;
S.Tickets = styled.div`
  grid-area: tickets;
`;
