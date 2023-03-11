import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getDevices, getFilterValues } from "../../axios";
import {
  ModalChildContainer,
  ButtonContainer,
  ScrollableContainer,
  CategorySelect,
} from "../components/styles/ModalChild";

export const AddFilter = ({
  closeModal,
  filterFormValues,
  setFilterFormValues,
  setDevices,
  search,
  isOwnerExists,
}) => {
  const [filters, setFilters] = useState({});

  // GET FILTERS ON FIRST RENDER
  useEffect(() => {
    const fetchFilters = async () => {
      const filterData = await getFilterValues(isOwnerExists, filterFormValues);
      setFilters(filterData.data.filters);
    };
    fetchFilters();
  }, []);

  // GET FILTERS FOR EACH FILTER CHANGE
  const handleFilterChange = async (e) => {
    filterFormValues[e.target.name] = e.target.value;
    const filterData = await getFilterValues(isOwnerExists, filterFormValues);
    setFilters(filterData.data.filters);
  };

  // FILTER FROM SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    const devicesData = await getDevices(
      search,
      isOwnerExists,
      filterFormValues.make,
      filterFormValues.model,
      filterFormValues.category,
      filterFormValues.owner
    );
    setDevices(devicesData?.data?.devices || []);

    closeModal();
  };

  const clearFilters = async () => {
    const reset = {
      make: "",
      model: "",
      category: "",
      owner: "",
    };
    setFilterFormValues(reset);
    const filterData = await getFilterValues(isOwnerExists, reset);
    setFilters(filterData.data.filters);

    const devicesData = await getDevices(
      search,
      isOwnerExists,
      reset.make,
      reset.model,
      reset.category,
      reset.owner
    );
    setDevices(devicesData?.data?.devices || []);

    closeModal();
  };

  return (
    <ModalChildContainer>
      <ScrollableContainer>
        <form>
          <h3>Make</h3>
          <CategorySelect
            name="make"
            onChange={handleFilterChange}
            value={filterFormValues.make}
          >
            <option disabled value="">
              {""}
            </option>
            {filters.makes?.map((filter) => {
              return (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              );
            })}
          </CategorySelect>

          <h3>Model</h3>
          <CategorySelect
            name="model"
            onChange={handleFilterChange}
            value={filterFormValues.model}
          >
            <option disabled value="">
              {""}
            </option>
            {filters.models?.map((filter) => {
              return (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              );
            })}
          </CategorySelect>

          <h3>Category</h3>
          <CategorySelect
            name="category"
            onChange={handleFilterChange}
            value={filterFormValues.category}
          >
            <option disabled value="">
              {""}
            </option>
            {filters.categories?.map((filter) => {
              return (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              );
            })}
          </CategorySelect>

          {isOwnerExists === "true" ? (
            <>
              <h3>Owner</h3>
              <CategorySelect
                name="owner"
                onChange={handleFilterChange}
                value={filterFormValues.owner}
              >
                <option disabled value="">
                  {""}
                </option>
                {filters.owners?.map((filter) => {
                  return (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  );
                })}
              </CategorySelect>
            </>
          ) : null}
        </form>
      </ScrollableContainer>
      <div>
        <FilterButtonContainer onClick={clearFilters}>
          CLEAR
        </FilterButtonContainer>

        <FilterButtonContainer onClick={submit}>FILTER</FilterButtonContainer>
      </div>
    </ModalChildContainer>
  );
};

// STYLED COMPONENTS

const FilterButtonContainer = styled(ButtonContainer)`
  width: 100%;
  margin: 0.2rem 0;
`;
