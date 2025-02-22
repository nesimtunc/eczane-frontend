import clsx from "clsx";
import PropTypes from "prop-types"; // ES6
import { useWindowSize } from "../../utils/hooks";
import styles from "./HeaderRow.module.scss";
import SearchBar from "./SearchBar";

export const SEARCH_AT = {
  HARITA: "harita",
  LISTE: "liste",
};

export const FILTER = {
  HEPSI: 0,
  HASTANE: 1,
  ECZANE: 2,
  PSIKOLOG: 3,
  VETERINER: 4,
  DIYALIZ: 5,
};

const FilterRow = ({
  filter,
  setFilter,
  hasVetData,
  hasPsikologData,
  hasDiyalizData,
}) => {
  const setHepsi = () => setFilter(FILTER.HEPSI);
  const setHastane = () => setFilter(FILTER.HASTANE);
  const setEczane = () => setFilter(FILTER.ECZANE);
  const setVeteriner = () => setFilter(FILTER.VETERINER);
  const setPsikolog = () => setFilter(FILTER.PSIKOLOG);
  const setDiyaliz = () => setFilter(FILTER.DIYALIZ);

  const SFilterButtons = [
    {
      label: "Hepsi",
      click: setHepsi,
      selected: filter === FILTER.HEPSI,
    },
    {
      label: "Hastane",
      click: setHastane,
      selected: filter === FILTER.HASTANE,
    },
    {
      label: "Eczane",
      click: setEczane,
      selected: filter === FILTER.ECZANE,
    },
    {
      label: "Veteriner",
      click: setVeteriner,
      selected: filter === FILTER.VETERINER,
      disabled: !hasVetData,
      buttonDisabled: !hasVetData,
    },
    {
      label: "Psikolojik Destek",
      click: setPsikolog,
      selected: filter === FILTER.PSIKOLOG,
      disabled: !hasPsikologData,
      buttonDisabled: !hasPsikologData,
    },
    {
      label: "Diyaliz Destek",
      click: setDiyaliz,
      selected: filter === FILTER.DIYALIZ,
      disabled: !hasDiyalizData,
      buttonDisabled: !hasDiyalizData,
    },
  ];
  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterFlex}>
        {SFilterButtons.map((item) => {
          const { label, click, selected } = item;
          return (
            <button
              key={label}
              className={clsx(styles.filterButton, {
                [styles.buttonDisabled]: item.buttonDisabled,
                [styles.selected]: selected,
              })}
              type="button"
              onClick={click}
              disabled={item.disabled || false}
            >
              {label.split(" ").map((word, i) => (
                <>
                  <span key={word}>{word}</span>
                  {i !== label.split(" ").length - 1 && <br />}
                </>
              ))}
            </button>
          );
        })}

        <div className={styles.filterIconWrapper}>
          <img
            className={styles.filterSvg}
            src="/icons/filter-icon.svg"
            alt="filter-icon"
          />
        </div>
      </div>
    </div>
  );
};

FilterRow.propTypes = {
  filter: PropTypes.number.isRequired,
  setFilter: PropTypes.func.isRequired,
  hasVetData: PropTypes.bool.isRequired,
  hasPsikologData: PropTypes.bool.isRequired,
  hasDiyalizData: PropTypes.bool.isRequired,
};

export const HeaderRow = ({
  searchAt,
  setSearchAt,
  filter,
  setFilter,
  searchBarVal,
  setSearchbarVal,
  hasVetData,
  hasPsikologData,
  hasDiyalizData,
}) => {
  const setHarita = () => setSearchAt(SEARCH_AT.HARITA);
  const setListe = () => setSearchAt(SEARCH_AT.LISTE);

  const { isXLarge } = useWindowSize();

  return (
    <div>
      <div className={styles.flex}>
        <div className={styles.toggleGroup}>
          <button
            className={clsx(styles.searchButton, {
              [styles.selected]: searchAt === SEARCH_AT.HARITA,
            })}
            type="button"
            onClick={setHarita}
          >
            Haritada
          </button>
          <button
            className={clsx(styles.searchButton, {
              [styles.selected]: searchAt === SEARCH_AT.LISTE,
            })}
            type="button"
            onClick={setListe}
          >
            Listede
          </button>
        </div>
        {isXLarge && (
          <FilterRow
            filter={filter}
            setFilter={setFilter}
            hasVetData={hasVetData}
          />
        )}
        <SearchBar
          searchBarVal={searchBarVal}
          setSearchBarVal={setSearchbarVal}
        />
      </div>
      {!isXLarge && (
        <div className={styles.filterNextRowWrapper}>
          <FilterRow
            filter={filter}
            setFilter={setFilter}
            hasVetData={hasVetData}
            hasPsikologData={hasPsikologData}
            hasDiyalizData={hasDiyalizData}
          />
        </div>
      )}
    </div>
  );
};

HeaderRow.propTypes = {
  searchAt: PropTypes.string.isRequired,
  setSearchAt: PropTypes.func.isRequired,
  filter: PropTypes.number.isRequired,
  setFilter: PropTypes.func.isRequired,
  searchBarVal: PropTypes.string.isRequired,
  setSearchbarVal: PropTypes.func.isRequired,
  hasVetData: PropTypes.bool.isRequired,
  hasPsikologData: PropTypes.bool.isRequired,
  hasDiyalizData: PropTypes.bool.isRequired,
};
