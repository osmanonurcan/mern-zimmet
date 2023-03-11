import { useState, useEffect } from "react";
import { deleteTicket, getTickets, changeTicketStatus } from "../../axios";
import { SearchBar } from "../components/SearchBar";
import { TicketAccordion } from "../components/TicketAccordion";
import {
  Section,
  SectionCenter,
  ColumnContainer,
  OneColumnContainer,
} from "../components/styles/Section";
import { RotatingLines } from "react-loader-spinner";
import { LoadingContainer } from "../components/styles/LoadingContainer";
import { WarningModal } from "../components/WarningModal";
import { WarningContainer } from "../components/styles/WarningContainer";
import { ButtonContainer } from "../components/styles/ModalChild";

export const Service = () => {
  const [tickets, setTickets] = useState();
  const [warningModal, setWarningModal] = useState("");
  const [selectedIds, setSelectedIds] = useState();
  let half;
  let firstHalf;
  let secondHalf;

  if (tickets) {
    half = Math.ceil(tickets.length / 2);
    firstHalf = tickets.slice(0, half);
    secondHalf = tickets.slice(half);
  }

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketsData = await getTickets();
      setTickets(ticketsData?.data.tickets);
    };

    fetchTickets();
  }, []);

  const closeWarningModal = async () => {
    const ticketsData = await getTickets();
    setTickets(ticketsData?.data.tickets);
    setWarningModal("");
  };
  const handleDoneTicket = async () => {
    const ticket = tickets.filter(
      (ticket) => ticket.ticket._id == selectedIds.ticketId
    )[0];

    await changeTicketStatus(selectedIds.deviceId, ticket.ticket, "done");
    closeWarningModal();
  };

  const handleDeleteTicket = async () => {
    await deleteTicket(selectedIds.deviceId, selectedIds.ticketId);

    closeWarningModal();
  };

  if (tickets == null) {
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
    <>
      <Section>
        {tickets.length < 2 ? (
          <SectionCenter>
            <OneColumnContainer>
              {tickets.map((ticket) => {
                return (
                  <TicketAccordion
                    key={ticket.ticket._id}
                    {...ticket}
                    {...{ warningModal, setWarningModal, setSelectedIds }}
                  />
                );
              })}
            </OneColumnContainer>
          </SectionCenter>
        ) : (
          <SectionCenter>
            <ColumnContainer>
              {firstHalf.map((ticket) => {
                return (
                  <TicketAccordion
                    key={ticket.ticket._id}
                    {...ticket}
                    {...{ warningModal, setWarningModal, setSelectedIds }}
                  />
                );
              })}
            </ColumnContainer>
            <ColumnContainer>
              {secondHalf.map((ticket) => {
                return (
                  <TicketAccordion
                    key={ticket.ticket._id}
                    {...ticket}
                    {...{ warningModal, setWarningModal, setSelectedIds }}
                  />
                );
              })}
            </ColumnContainer>
          </SectionCenter>
        )}
      </Section>
      <WarningModal {...{ warningModal, closeWarningModal }}>
        <WarningContainer>
          <h3>Are you sure?</h3>

          <div>
            <ButtonContainer onClick={closeWarningModal}>
              Cancel
            </ButtonContainer>
            <ButtonContainer
              onClick={
                warningModal === "delete"
                  ? handleDeleteTicket
                  : handleDoneTicket
              }
            >
              Yes
            </ButtonContainer>
          </div>
        </WarningContainer>
      </WarningModal>
    </>
  );
};
