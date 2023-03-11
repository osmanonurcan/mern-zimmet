import { DeviceCard } from "../components/DeviceCard";
import { CardContainer } from "../components/styles/CardContainer";
import { FilterButton } from "../components/FilterButton";
import { SearchBar } from "../components/SearchBar";
import * as S from "../components/styles/Main";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { getDevices, getFilterValues } from "../../axios";
import { useGlobalContext } from "../../context";
import { AddFilter } from "../components/AddFilter";
import { WarningModal } from "../components/WarningModal";
import { WarningContainer } from "../components/styles/WarningContainer";
import { ButtonContainer } from "../components/styles/ModalChild";
import { UpdateDevice } from "../components/updateDevice";
import { AddService } from "../components/AddService";

export const Home = () => {
  const [modal, setModal] = useState("");
  const { devices, setDevices } = useGlobalContext();
  const [search, setSearch] = useState("");
  const initialFilters = {
    make: "",
    model: "",
    category: "",
    owner: "",
  };
  const [filterFormValues, setFilterFormValues] = useState(initialFilters);
  const [clickedDeviceId, setClickedDeviceId] = useState("");
  const [warningModal, setWarningModal] = useState("");
  const device = devices.filter((device) => device._id === clickedDeviceId)[0];

  // SEARCH BAR HANDLER
  const handleChange = async (e) => {
    setSearch(e.target.value);
    const devicesData = await getDevices(
      e.target.value,
      true,
      filterFormValues.make,
      filterFormValues.model,
      filterFormValues.category,
      filterFormValues.owner
    );

    setDevices(devicesData?.data?.devices || []);
  };

  // GET DEVICES ON FIRST RENDER
  useEffect(() => {
    const fetchDevices = async () => {
      const devicesData = await getDevices("", true);
      setDevices(devicesData?.data?.devices || []);
    };
    fetchDevices();
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
    const devicesData = await getDevices("", false);
    setDevices(devicesData?.data?.devices || []);
    closeWarningModal();
  };

  return (
    <S.Main>
      <SearchBar handleChange={handleChange} search={search} />
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
      <FilterButton onClick={() => setModal("filter")} />
      <Modal {...{ modal, closeModal }}>
        {modal === "filter" ? (
          <AddFilter
            {...{
              closeModal,
              filterFormValues,
              setFilterFormValues,
              setDevices,
              search,
            }}
            isOwnerExists={true}
          />
        ) : modal === "update" ? (
          <UpdateDevice
            {...{
              devices,
              clickedDeviceId,
              closeModal,
              device,
              setDevices,
            }}
            isOwnerExists={true}
          />
        ) : (
          <AddService
            {...{
              devices,
              clickedDeviceId,
              closeModal,
              device,
              setDevices,
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
