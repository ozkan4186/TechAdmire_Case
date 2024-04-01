import React, { useState } from "react";
import applicationsData from "../../data.js";

const Home = () => {
  const [filters, setFilters] = useState({
    country: "",
    university: "",
    duration: "",
    minCost: "",
    maxCost: "",
    language: "",
  });

  const [sortOption, setSortOption] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredApplications = applicationsData
    .filter((application) => {
      const countryFilter =
        !filters.country || application.country === filters.country;
      const universityFilter =
        !filters.university || application.university === filters.university;
      const durationFilter =
        !filters.duration ||
        application.duration.toString() === filters.duration;
      const costFilter =
        (!filters.minCost || application.cost >= parseInt(filters.minCost)) &&
        (!filters.maxCost || application.cost <= parseInt(filters.maxCost));
      const languageFilter =
        !filters.language || application.language === filters.language;

      return (
        countryFilter &&
        universityFilter &&
        durationFilter &&
        costFilter &&
        languageFilter
      );
    })
    .sort((a, b) => {
      if (sortOption === "lowestPrice") {
        return a.cost - b.cost;
      } else if (sortOption === "highestPrice") {
        return b.cost - a.cost;
      } else if (sortOption === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline);
      } else {
        return 0;
      }
    });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h1 className="text-center text-3xl text-red-500 ">
        Filtrelenmiş Başvuru Listesi
      </h1>
      <div>
        <select
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        >
          <option value="">Tüm Ülkeler</option>
          {Array.from(
            new Set(applicationsData.map((application) => application.country))
          ).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, university: e.target.value })
          }
        >
          <option value="">Tüm Üniversiteler</option>
          {Array.from(
            new Set(
              applicationsData.map((application) => application.university)
            )
          ).map((university) => (
            <option key={university} value={university}>
              {university}
            </option>
          ))}
        </select>
        {/* Süre filtresi */}
        <select
          onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
        >
          <option value="">Tüm Süreler</option>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((year) => (
            <option key={year} value={year}>
              {year} yıl
            </option>
          ))}
        </select>
        {/* Dil filtresi */}
        <select
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">Tüm Diller</option>
          {["English", "French", "Turkish"].map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        {/* Maliyet aralığı filtresi */}
        <input
          type="number"
          placeholder="Min Maliyet"
          onChange={(e) => setFilters({ ...filters, minCost: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Maliyet"
          onChange={(e) => setFilters({ ...filters, maxCost: e.target.value })}
        />
        {/* Sıralama */}
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sırala</option>
          <option value="lowestPrice">En Düşük Fiyat</option>
          <option value="highestPrice">En Yüksek Fiyat</option>
          <option value="deadline">Son Başvuru Tarihi</option>
        </select>
      </div>

      {/* Sayfalama */}
      <div className="flex flex-wrap justify-center ">
        {paginatedApplications.map((application) => (
          <div
            key={application.name}
            class="  max-w-sm rounded overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base" />

              <p>Adı: {application.name}</p>
              <p>Üniversite: {application.university}</p>
              <p>Ülke: {application.country}</p>
              <p>Süre: {application.duration} yıl</p>
              <p>Maliyet: ${application.cost}</p>
              <p>Son Başvuru Tarihi: {application.deadline}</p>
              <p>Dil: {application.language}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Sayfalama kontrolleri */}
      {totalPages > 1 && (
        <div className="text-center  ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 "
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
          >
            Önceki Sayfa
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 "
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < totalPages ? prevPage + 1 : prevPage
              )
            }
          >
            Sonraki Sayfa
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
