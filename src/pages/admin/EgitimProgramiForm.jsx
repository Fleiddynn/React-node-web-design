import React, { useState, useEffect } from "react";
import {
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  TruckIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  MapIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  BookOpenIcon,
  UserGroupIcon,
  PlusIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

const iconOptions = [
  { name: "TrendingUp", component: ArrowTrendingUpIcon },
  { name: "Globe", component: GlobeAltIcon },
  { name: "ShoppingCart", component: ShoppingCartIcon },
  { name: "FileText", component: DocumentTextIcon },
  { name: "TruckIcon", component: TruckIcon },
  { name: "DollarSign", component: CurrencyDollarIcon },
  { name: "Award", component: AcademicCapIcon },
  { name: "Map", component: MapIcon },
  { name: "PieChart", component: ChartPieIcon },
  { name: "CheckSquare", component: CheckBadgeIcon },
  { name: "Book", component: BookOpenIcon },
  { name: "Users", component: UserGroupIcon },
];

const EgitimProgramiForm = ({
  initialData = {},
  onSubmit,
  isEditing = false,
  saving,
}) => {
  const [programName, setProgramName] = useState(
    initialData.program_name || ""
  );
  const [sections, setSections] = useState(() => {
    if (
      initialData.program_sections &&
      initialData.program_sections.length > 0
    ) {
      return initialData.program_sections.map((section) => ({
        ...section,
        id: section.id || Date.now() + Math.random(),
        content: Array.isArray(section.content)
          ? section.content.join("\n")
          : "",
      }));
    }
    return [{ id: Date.now(), title: "", iconType: "TrendingUp", content: "" }];
  });
  const [openContentPanels, setOpenContentPanels] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      if (initialData.program_name !== programName) {
        setProgramName(initialData.program_name || "");
      }

      if (
        (initialData.program_sections &&
          initialData.program_sections.length !== sections.length) ||
        (initialData.program_sections.length > 0 && sections[0]?.content === "")
      ) {
        setSections(
          initialData.program_sections.map((section) => ({
            ...section,
            id: section.id || Date.now() + Math.random(),
            content: Array.isArray(section.content)
              ? section.content.join("\n")
              : "",
          }))
        );
      }
    } else {
    }
  }, [initialData, isEditing]);

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleContentTextareaChange = (sectionIndex, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].content = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), title: "", iconType: "TrendingUp", content: "" },
    ]);
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const toggleContentPanel = (sectionId) => {
    setOpenContentPanels((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!programName.trim()) {
      setError("Program Adı alanı boş bırakılamaz.");
      return;
    }

    const cleanedSections = sections
      .map((section) => {
        const topics = section.content
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item !== "");

        return {
          ...section,
          title: section.title.trim(),
          content: topics,
        };
      })
      .filter((section) => section.title !== "");

    if (cleanedSections.length === 0) {
      setError("En az bir program bölümü (başlıklı) eklemelisiniz.");
      return;
    }

    for (const section of cleanedSections) {
      if (section.title && section.content.length === 0) {
        setError(
          `"${section.title}" başlıklı bölümün en az bir konusu olmalıdır.`
        );
        return;
      }
    }

    onSubmit({
      program_name: programName.trim(),
      program_sections: cleanedSections,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="programName"
          className="block text-sm font-medium text-gray-700"
        >
          Program Adı (Ana Başlık)
        </label>
        <input
          type="text"
          id="programName"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          required
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Program Bölümleri
      </h2>
      <div className="space-y-4 border p-4 rounded-md bg-gray-50">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="p-4 border border-gray-200 rounded-md bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800">
                Bölüm {sectionIndex + 1}
              </h3>
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="text-red-600 hover:text-red-800 rounded-full p-1 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor={`section-title-${sectionIndex}`}
                className="block text-sm font-medium text-gray-700"
              >
                Başlık
              </label>
              <input
                type="text"
                id={`section-title-${sectionIndex}`}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(sectionIndex, "title", e.target.value)
                }
                placeholder="Bölüm Başlığı"
                required={sectionIndex === 0}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor={`section-icon-${sectionIndex}`}
                className="block text-sm font-medium text-gray-700"
              >
                İkon Tipi
              </label>
              <select
                id={`section-icon-${sectionIndex}`}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={section.iconType}
                onChange={(e) =>
                  handleSectionChange(sectionIndex, "iconType", e.target.value)
                }
              >
                {iconOptions.map((icon) => (
                  <option key={icon.name} value={icon.name}>
                    {icon.name}
                  </option>
                ))}
              </select>
              {section.iconType && (
                <div className="mt-2 text-gray-600 flex items-center">
                  Seçilen İkon:{" "}
                  {React.createElement(
                    iconOptions.find((opt) => opt.name === section.iconType)
                      ?.component,
                    { className: "h-6 w-6 ml-2 text-blue-500" }
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                type="button"
                className="w-full flex justify-between items-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                onClick={() => toggleContentPanel(section.id)}
              >
                <span className="font-medium text-gray-700">
                  Konular (satır satır)
                </span>
                {openContentPanels[section.id] ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </button>
              <AnimatePresence>
                {openContentPanels[section.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="p-3 bg-white border rounded-md">
                      <textarea
                        rows="5"
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        value={section.content}
                        onChange={(e) =>
                          handleContentTextareaChange(
                            sectionIndex,
                            e.target.value
                          )
                        }
                        placeholder="Her bir konuyu ayrı satıra yazınız."
                      ></textarea>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
        <button
          type="button"
          onClick={addSection}
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md inline-flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Bölüm Ekle
        </button>
      </div>

      {error && <div className="text-red-600 text-sm mt-4">{error}</div>}

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          disabled={saving}
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          disabled={saving}
        >
          {saving
            ? "Kaydediliyor..."
            : isEditing
            ? "Program Yapısını Güncelle"
            : "Program Yapısı Ekle"}
        </button>
      </div>
    </form>
  );
};

export default EgitimProgramiForm;
