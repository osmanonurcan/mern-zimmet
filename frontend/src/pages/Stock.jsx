import { DeviceCard } from "../components/DeviceCard";
import { CardContainer } from "../components/styles/CardContainer";
import { AddButton } from "../components/AddButton";
import { SearchBar } from "../components/SearchBar";
import * as S from "../components/styles/Main";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../components/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { createDevice, deleteDevice, getDevices } from "../../axios";
import { FilterButton } from "../components/FilterButton";
import {
  ModalChildContainer,
  ButtonContainer,
  ScrollableContainer,
  CategorySelect,
  FieldContainer,
  ModalInput,
  ModalTextArea,
} from "../components/styles/ModalChild";
import { AddFilter } from "../components/AddFilter";
import { WarningModal } from "../components/WarningModal";
import { WarningContainer } from "../components/styles/WarningContainer";
import { AddImage } from "../components/AddImage";
import { UpdateDevice } from "../components/updateDevice";
import styled from "styled-components";
import { LoadingContainer } from "../components/styles/LoadingContainer";
import { RotatingLines } from "react-loader-spinner";
import { AddService } from "../components/AddService";
import { useOwnerExists } from "../components/useOwnerExists";
import { Input } from "../components/styles/Input";

export const Stock = () => {
  const [modal, setModal] = useState("");
  const [warningModal, setWarningModal] = useState("");
  const [devices, setDevices] = useState();
  const [search, setSearch] = useState("");
  const [isOwnerExists, setIsOwnerExists] = useState();
  const initialFilters = {
    make: "",
    model: "",
    category: "",
    owner: "",
  };
  const [filterFormValues, setFilterFormValues] = useState(initialFilters);
  const [clickedDeviceId, setClickedDeviceId] = useState("");
  let device;
  if (devices != null) {
    device = devices.filter((device) => device._id === clickedDeviceId)[0];
  }

  // SEARCH BAR HANDLER
  const handleChange = async (e) => {
    setSearch(e.target.value);
    const devicesData = await getDevices(
      e.target.value,
      isOwnerExists,
      filterFormValues.make,
      filterFormValues.model,
      filterFormValues.category,
      filterFormValues.owner
    );

    setDevices(devicesData?.data.devices);
  };

  // GET DEVICES ON FIRST RENDER
  useEffect(() => {
    const fetchDevices = async () => {
      if (isOwnerExists) {
        const devicesData = await getDevices("", isOwnerExists);

        setDevices(devicesData?.data.devices);
        setSearch("");
      }
    };
    fetchDevices();
  }, [isOwnerExists]);

  // GET LOCAL OWNER EXISTS DATA
  useEffect(() => {
    let localOwnerExists = window.localStorage.getItem("isOwnerExists");
    if (localOwnerExists == null) {
      localOwnerExists = "true";
      window.localStorage.setItem("isOwnerExists", "true");
      setIsOwnerExists(localOwnerExists);
    } else {
      setIsOwnerExists(localOwnerExists);
    }
  }, []);

  const closeModal = (e) => {
    setModal("");
  };
  const closeWarningModal = (e) => {
    setWarningModal("");
  };
  const handleDeleteDevice = async () => {
    await deleteDevice(clickedDeviceId);
    setClickedDeviceId("");
    const devicesData = await getDevices("", isOwnerExists);
    setDevices(devicesData?.data.devices);
    closeWarningModal();
  };

  const setOwnerExists = (owner) => {
    window.localStorage.setItem("isOwnerExists", owner);
    setIsOwnerExists(owner);
  };

  // IF DEVICES IS NULL OR UNDEFINED, RETURN LOADING SCREEN
  if (devices == null || isOwnerExists == null) {
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
    <S.Main>
      <div>
        <SearchBar handleChange={handleChange} search={search} />
        <OwnerSelect {...{ setOwnerExists, isOwnerExists }} />
      </div>

      <CardContainer cardsAmount={devices.length}>
        {devices.length > 0 &&
          devices.map((device) => {
            return (
              <DeviceCard
                key={device._id}
                {...device}
                setWarningModal={setWarningModal}
                setClickedDeviceId={setClickedDeviceId}
                setModal={setModal}
              />
            );
          })}
      </CardContainer>
      <AddButton onClick={() => setModal("add")} />
      <FilterButton onClick={() => setModal("filter")} isUp={true} />
      <Modal {...{ modal, closeModal }}>
        {modal === "add" ? (
          <AddDevice {...{ closeModal, setDevices, isOwnerExists }} />
        ) : modal === "filter" ? (
          <AddFilter
            {...{
              closeModal,
              filterFormValues,
              setFilterFormValues,
              search,
              isOwnerExists,

              setDevices,
            }}
          />
        ) : modal === "update" ? (
          <UpdateDevice
            {...{
              devices,
              clickedDeviceId,
              closeModal,
              device,
              setDevices,
              isOwnerExists,
            }}
          />
        ) : (
          <AddService
            {...{
              devices,
              clickedDeviceId,
              closeModal,
              device,
            }}
          />
        )}
      </Modal>
      <WarningModal {...{ warningModal, closeWarningModal }}>
        <WarningContainer>
          <h3>Are you sure?</h3>

          <div>
            <ButtonContainer onClick={closeWarningModal}>
              Cancel
            </ButtonContainer>
            <ButtonContainer onClick={handleDeleteDevice}>Yes</ButtonContainer>
          </div>
        </WarningContainer>
      </WarningModal>
    </S.Main>
  );
};

// COMPONENTS

const OwnerSelect = ({ isOwnerExists, setOwnerExists }) => {
  return (
    <OwnerSelectContainer>
      <OwnerButton
        isOwnerExists={isOwnerExists}
        onClick={() => setOwnerExists("true")}
      >
        Owner
      </OwnerButton>
      <NoOwnerButton
        isOwnerExists={isOwnerExists}
        onClick={() => setOwnerExists("false")}
      >
        No Owner
      </NoOwnerButton>
    </OwnerSelectContainer>
  );
};

const AddDevice = ({ closeModal, setDevices, isOwnerExists }) => {
  const [specFields, setSpecFields] = useState([]);
  const make = useRef();
  const model = useRef();
  const category = useRef();
  const description = useRef();
  const owner = useRef();
  const [image, setImage] = useState("");

  const onImageChange = (image) => {
    setImage(image);
  };

  const handleFormChange = (event, index) => {
    let data = [...specFields];
    data[index][event.target.name] = event.target.value;
    setSpecFields(data);
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      make: make.current?.value,
      model: model.current?.value,
      category: category.current?.value,
      description: description.current?.value,
      owner: owner.current?.value,
      specs: specFields,
    };

    if (image[0]?.file) {
      payload.image = image[0].file;
    }

    // CREATE DEVICE
    const device = await createDevice(payload);

    const devicesData = await getDevices(e.target.value, isOwnerExists);
    setDevices(devicesData?.data?.devices || []);

    closeModal();
  };

  const addFields = () => {
    let object = {
      title: "",
      info: "",
    };

    setSpecFields([...specFields, object]);
  };

  const removeFields = (index) => {
    let data = [...specFields];
    data.splice(index, 1);
    setSpecFields(data);
  };
  return (
    <ModalChildContainer>
      <ScrollableContainer>
        <AddImage {...{ image, onImageChange }} />
        <form>
          <h3>Make</h3>
          <ModalInput name="make" type="text" ref={make} />

          <h3>Model</h3>
          <ModalInput name="model" type="text" ref={model} />

          <h3>Category</h3>
          <CategorySelect name="category" ref={category} defaultValue="">
            <option disabled value="">
              {""}
            </option>
            <option value="Computer">Computer</option>
            <option value="Accessory">Accessory</option>
            <option value="Component">Component</option>
            <option value="Other">Other</option>
          </CategorySelect>

          <h3>Description</h3>
          <ModalTextArea name="description" type="text" ref={description} />

          <h3>Owner</h3>
          <ModalInput name="owner" type="text" ref={owner} />

          <h3>Specs</h3>
          {specFields.map((spec, index) => {
            return (
              <FieldContainer key={index}>
                <CategorySelect
                  name="title"
                  onChange={(event) => handleFormChange(event, index)}
                  defaultValue=""
                >
                  <option disabled value="">
                    {""}
                  </option>
                  <option value="CPU">CPU</option>
                  <option value="GPU">GPU</option>
                  <option value="RAM">RAM</option>
                  <option value="SSD">SSD</option>
                  <option value="HDD">HDD</option>
                </CategorySelect>
                <ModalInput
                  name="info"
                  placeholder="Info"
                  onChange={(event) => handleFormChange(event, index)}
                  value={spec.info}
                />
                <ButtonContainer onClick={() => removeFields(index)}>
                  <AiOutlineClose />
                </ButtonContainer>
              </FieldContainer>
            );
          })}
        </form>
        <ButtonContainer onClick={addFields}>Add Spec..</ButtonContainer>
      </ScrollableContainer>
      <ButtonContainer onClick={submit}>ADD</ButtonContainer>
    </ModalChildContainer>
  );
};

// STYLED COMPONENTS

const OwnerSelectContainer = styled.div`
  button {
    padding: 0.3rem;
    cursor: pointer;
  }
`;

const OwnerButton = styled(ButtonContainer)`
  border-radius: 10px 0px 0px 10px;
  border-right: 0;
  background-color: ${({ isOwnerExists, theme }) =>
    isOwnerExists === "true" ? theme.text : theme.body};
  color: ${({ isOwnerExists, theme }) =>
    isOwnerExists === "true" ? theme.body : theme.text}; ;
`;

const NoOwnerButton = styled(ButtonContainer)`
  border-radius: 0px 10px 10px 0px;
  background-color: ${({ isOwnerExists, theme }) =>
    isOwnerExists === "true" ? theme.body : theme.text};
  color: ${({ isOwnerExists, theme }) =>
    isOwnerExists === "true" ? theme.text : theme.body}; ;
`;
