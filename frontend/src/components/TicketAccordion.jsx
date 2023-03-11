import { useRef, useState, useEffect } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillEdit,
  AiFillDelete,
  AiOutlineArrowRight,
} from "react-icons/ai";
import styled from "styled-components";
import {
  AccordionContainer,
  AccordionTitle,
  AccordionInfo,
  Info,
  Buttons,
} from "./styles/Accordion";
import { format } from "date-fns";
import {
  ButtonContainer,
  CategorySelect,
} from "../components/styles/ModalChild";

import { changeTicketStatus, deleteTicket } from "../../axios";

export const TicketAccordion = ({
  deviceId,
  make,
  model,
  ticket,
  warningModal,
  setWarningModal,
  setSelectedIds,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(ticket.status);

  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;
    if (selectedStatus === "done") {
      setSelectedIds({ deviceId, ticketId: ticket._id });
      setWarningModal(selectedStatus);
    } else {
      await changeTicketStatus(deviceId, ticket, selectedStatus);
      setStatus(selectedStatus);
    }
  };

  useEffect(() => {
    setStatus(ticket.status);
  }, [ticket.status]);

  return (
    <>
      <AccordionContainer>
        <AccordionTitle>
          <h2 onClick={() => setIsOpen(!isOpen)}>
            {make} {model}
          </h2>
          <i onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </i>
        </AccordionTitle>
        <AccordionInfo isOpen={isOpen} infoHeight="17rem">
          <SpecsContainer>
            <InfoOldSpecs>
              <h4>Old Specs</h4>
              <div>
                {ticket.oldSpecs.map((spec, index) => {
                  return (
                    <div key={index}>
                      {spec.title}: {spec.info}
                    </div>
                  );
                })}
              </div>
            </InfoOldSpecs>
            <InfoArrow>
              <AiOutlineArrowRight />
            </InfoArrow>
            <InfoNewSpecs>
              <h4>New Specs</h4>
              <div>
                {ticket.newSpecs.map((spec, index) => {
                  return (
                    <div key={index}>
                      {spec.title}: {spec.info}
                    </div>
                  );
                })}
              </div>
            </InfoNewSpecs>
          </SpecsContainer>
          <InfoLine />
          <InfoDescription>Description: {ticket.description}</InfoDescription>
          <InfoLine />
          <InfoFooter>
            <div>
              create: {format(new Date(ticket.createdAt), "dd-MM-yyyy")}
            </div>
            <div>
              update: {format(new Date(ticket.updatedAt), "dd-MM-yyyy")}
            </div>
            <div>
              <CategorySelect
                name="status"
                onChange={handleStatusChange}
                value={status}
                disabled={status === "done"}
              >
                <option value="pending">pending</option>
                <option value="processing">processing</option>
                <option value="done">done</option>
              </CategorySelect>
            </div>
            <div>
              <i
                onClick={() => {
                  setSelectedIds({ deviceId, ticketId: ticket._id });
                  setWarningModal("delete");
                }}
              >
                <AiFillDelete />
              </i>
            </div>
          </InfoFooter>
        </AccordionInfo>
      </AccordionContainer>
    </>
  );
};

// STYLED COMPONENTS

const SpecsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7rem;
  overflow: auto;
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.text};
    border-radius: 10px;
  }
  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.card};
    border-radius: 10px;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;

const InfoLine = styled.hr`
  margin: 0.5rem 0;
`;

const InfoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  select {
    background-color: ${({ theme }) => theme.card};
  }

  & > div {
    font-size: 0.8rem;
  }

  i {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 10px;
    padding: 0.2rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const InfoArrow = styled.i`
  margin: 0 1rem;
`;
const InfoOldSpecs = styled.div`
  & > div {
    overflow-wrap: break-word;
  }
  height: 100%;
  width: calc(50% - 2rem);
`;
const InfoNewSpecs = styled.div`
  & > div {
    overflow-wrap: break-word;
  }
  height: 100%;
  width: calc(50% - 2rem);
`;

const InfoDescription = styled.div`
  overflow-wrap: break-word;
  height: 5rem;
  overflow-y: auto;
`;
