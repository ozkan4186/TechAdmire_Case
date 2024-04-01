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
      <div className="flex flex-wrap border border-gray-100">
        {/* Ülke filtresi */}
        <div className="w-full p-2">
          <label className="block mb-1">Ülke</label>
          <select
            className="w-full border rounded-md p-1"
            onChange={(e) =>
              setFilters({ ...filters, country: e.target.value })
            }
          >
            <option value="">Tüm Ülkeler</option>
            {Array.from(
              new Set(
                applicationsData.map((application) => application.country)
              )
            ).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Üniversite filtresi */}
        <div className="w-full p-2">
          <label className="block mb-1">Üniversite</label>
          <select
            className="w-full border rounded-md p-1"
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
        </div>

        {/* Süre filtresi */}
        <div className="w-full p-2">
          <label className="block mb-1">Süre</label>
          <select
            className="w-full border rounded-md p-1"
            onChange={(e) =>
              setFilters({ ...filters, duration: e.target.value })
            }
          >
            <option value="">Tüm Süreler</option>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((year) => (
              <option key={year} value={year}>
                {year} yıl
              </option>
            ))}
          </select>
        </div>

        {/* Dil filtresi */}
        <div className="w-full p-2">
          <label className="block mb-1">Dil</label>
          <select
            className="w-full border rounded-md p-1"
            onChange={(e) =>
              setFilters({ ...filters, language: e.target.value })
            }
          >
            <option value="">Tüm Diller</option>
            {["English", "French", "Turkish"].map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Maliyet aralığı filtresi */}
        <div className="w-full p-2">
          <label className="block mb-1">Maliyet Aralığı</label>
          <input
            type="number"
            className="w-full border rounded-md p-1"
            placeholder="Min Maliyet"
            onChange={(e) =>
              setFilters({ ...filters, minCost: e.target.value })
            }
          />
          <input
            type="number"
            className="w-full border rounded-md p-1"
            placeholder="Max Maliyet"
            onChange={(e) =>
              setFilters({ ...filters, maxCost: e.target.value })
            }
          />
        </div>

        {/* Sıralama seçeneği */}
        <div className="w-full p-2">
          <label className="block mb-1">Sırala</label>
          <select
            className="w-full border rounded-md p-1"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sırala</option>
            <option value="lowestPrice">En Düşük Fiyat</option>
            <option value="highestPrice">En Yüksek Fiyat</option>
            <option value="deadline">Son Başvuru Tarihi</option>
          </select>
        </div>
      </div>

      {/* Sayfalama */}
      <div className="flex flex-wrap justify-center gap-3 ">
        {paginatedApplications.map((application) => (
          <div
            key={application.name}
            class="  max-w-sm rounded overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Students Application System
              </div>
              <p className="text-gray-700 text-base" />

              <p>
                {" "}
                <span className="text-xl text-red-600 ">Adı:</span>{" "}
                {application.name}
              </p>
              <p>
                {" "}
                <span className="text-xl text-red-600 ">Üniversite:</span>{" "}
                {application.university}
              </p>
              <p>
                {" "}
                <span className="text-xl text-red-600 ">Ülke:</span>{" "}
                {application.country}
              </p>
              <p>
                {" "}
                <span className="text-xl text-red-600 ">Süre:</span>{" "}
                {application.duration} yıl
              </p>
              <p>
                {" "}
                <span className="text-xl text-red-600 ">Maliyet:</span> $
                {application.cost}
              </p>
              <p>
                {" "}
                <span className="text-xl text-red-600 ">
                  Son Başvuru Tarihi:
                </span>{" "}
                {application.deadline}
              </p>
              <p>
                {" "}
                <span className="text-xl text-red-600 ">Dil:</span>{" "}
                {application.language}
              </p>
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
