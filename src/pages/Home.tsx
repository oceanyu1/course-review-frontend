import React, { useState } from "react"; // Import useState
import CourseList from "../components/CourseList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the list of departments you'll display in the dropdown
// You should replace these with your actual scraped codes (COMP, MATH, etc.)
const DEPARTMENTS = [
    { code: "AERO", name: "Aerospace Engineering" },
    { code: "AFRI", name: "African Studies" },
    { code: "ASLA", name: "American Sign Language" },
    { code: "ANTH", name: "Anthropology" },
    { code: "ALDS", name: "Applied Linguistics and Discourse Studies" },
    { code: "ARAB", name: "Arabic" },
    { code: "ARCY", name: "Archaeology" },
    { code: "ACSE", name: "Architectural Conservation and Sustainability Engineering" },
    // Architecture has multiple codes; using the primary ones and noting the others
    { code: "ARCS", name: "Architecture - Studio" },
    { code: "ARCC", name: "Architecture - Technical" },
    { code: "ARCN", name: "Architecture - Techniques" },
    { code: "ARCH", name: "Architecture - Theory/History" },
    { code: "ARCU", name: "Architecture - Urban" },
    { code: "ARTH", name: "Art and Architectural History" },
    { code: "BIOC", name: "Biochemistry" },
    { code: "BIOL", name: "Biology" },
    { code: "BUSI", name: "Business" },
    { code: "CDNS", name: "Canadian Studies" },
    { code: "CIED", name: "Centre for Initiatives in Education" },
    { code: "CHEM", name: "Chemistry" },
    { code: "CHST", name: "Childhood and Youth Studies" },
    { code: "CHIN", name: "Chinese" },
    { code: "CIVE", name: "Civil Engineering" },
    { code: "CLCV", name: "Classical Civilization" },
    { code: "COOP", name: "Co-operative Education" },
    { code: "CGSC", name: "Cognitive Science" },
    { code: "COMS", name: "Communication and Media Studies" },
    { code: "CCDP", name: "Communication Courses for Disciplines and Professions" },
    { code: "COMP", name: "Computer Science" },
    { code: "CRCJ", name: "Criminology and Criminal Justice" },
    { code: "CRST", name: "Critical Race Studies" },
    { code: "CSEC", name: "Cybersecurity" },
    { code: "DATA", name: "Data Science" },
    { code: "DIGH", name: "Digital Humanities" },
    { code: "DBST", name: "Disability Studies" },
    { code: "ERTH", name: "Earth Sciences" },
    { code: "ECON", name: "Economics" },
    { code: "ELEC", name: "Electronics" },
    { code: "ECOR", name: "Engineering Common Core Courses" },
    { code: "ENGL", name: "English" },
    { code: "ESLA", name: "English as a Second Language" },
    { code: "EACH", name: "Environmental and Climate Humanities" },
    { code: "ENVE", name: "Environmental Engineering" },
    { code: "ENSC", name: "Environmental Science" },
    { code: "ENST", name: "Environmental Studies" },
    { code: "EURR", name: "European, Russian and Eurasian Studies" },
    { code: "FILM", name: "Film Studies" },
    { code: "FYSM", name: "First-Year Seminars" },
    { code: "FOOD", name: "Food Science" },
    { code: "FREN", name: "French" },
    { code: "FINS", name: "French Interdisciplinary Studies" },
    { code: "GEOG", name: "Geography" },
    { code: "GEOM", name: "Geomatics" },
    { code: "GERM", name: "German" },
    { code: "GINS", name: "Global and International Studies" },
    { code: "GREK", name: "Greek" },
    { code: "HLTH", name: "Health Sciences" },
    { code: "HIST", name: "History" },
    { code: "HRSJ", name: "Human Rights and Social Justice" },
    { code: "HUMS", name: "Humanities" },
    { code: "INDG", name: "Indigenous Studies" },
    { code: "IDES", name: "Industrial Design" },
    // Grouping Information Technology related codes
    { code: "BIT", name: "Info. Tech. (BIT/IRM/IMD/NET/OSS)" },
    { code: "ITEC", name: "Information Technology (ITEC)" },
    { code: "INSC", name: "Integrated Science" },
    { code: "IPAF", name: "Interdisciplinary Public Affairs" },
    { code: "ISCI", name: "Interdisciplinary Science" },
    { code: "ISAP", name: "Interdisciplinary Science and Practice" },
    { code: "DIST", name: "Interdisciplinary Studies" },
    { code: "INAF", name: "International Affairs" },
    { code: "ITAL", name: "Italian" },
    { code: "JAPA", name: "Japanese" },
    { code: "JOUR", name: "Journalism and Communication" },
    { code: "KORE", name: "Korean" },
    { code: "LANG", name: "Language Studies" },
    { code: "LATN", name: "Latin" },
    { code: "LACS", name: "Latin American and Caribbean Studies" },
    { code: "LAWS", name: "Law" },
    { code: "LING", name: "Linguistics" },
    { code: "MATH", name: "Mathematics" },
    { code: "MECH", name: "Mechanical Engineering" },
    { code: "MAAE", name: "Mechanical and Aerospace Engineering" },
    { code: "MECT", name: "Mechatronics Engineering" },
    { code: "MPAD", name: "Media Production and Design" },
    { code: "MEMS", name: "Medieval and Early Modern Studies" },
    { code: "MGDS", name: "Migration and Diaspora Studies" },
    { code: "MUSI", name: "Music" },
    { code: "NSCI", name: "Natural Sciences" },
    { code: "NEUR", name: "Neuroscience" },
    { code: "NURS", name: "Nursing" },
    { code: "PHIL", name: "Philosophy" },
    { code: "PHYS", name: "Physics" },
    { code: "POLM", name: "Political Management" },
    { code: "PSCI", name: "Political Science" },
    { code: "PORT", name: "Portuguese" },
    { code: "PSYC", name: "Psychology" },
    { code: "PAPM", name: "Public Affairs and Policy Management" },
    { code: "PADM", name: "Public Policy and Administration" },
    { code: "RELI", name: "Religion" },
    { code: "RUSS", name: "Russian" },
    { code: "SXST", name: "Sexuality Studies" },
    { code: "SOWK", name: "Social Work" },
    { code: "SOCI", name: "Sociology" },
    { code: "SPAN", name: "Spanish" },
    { code: "STAT", name: "Statistics" },
    { code: "SREE", name: "Sustainable and Renewable Energy Engineering" },
    { code: "SYSC", name: "Systems and Computer Engineering" },
    { code: "TSES", name: "Technology, Society, Environment Studies" },
    { code: "WGST", name: "Women's and Gender Studies" },
];

function Home() {
    const [selectedDepartmentCode, setSelectedDepartmentCode] = useState("COMP");
    const [selectedSortOption, setSelectedSortOption] = useState("courseNumber_asc");
    const [searchQuery, setSearchQuery] = useState("");

    // Handlers for Select components need to take the raw value string
    const handleDepartmentChange = (value: string) => {
        setSelectedDepartmentCode(value);
    };

    const handleSortChange = (value: string) => {
        setSelectedSortOption(value);
    }
    
    // Handler for Input remains the same as it returns a DOM event
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    return (
        <div className="space-y-6 pt-6">
            <h1 className="text-3xl font-bold tracking-tight">Browse Courses</h1>
            
            {/* Search, Department, and Sort Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
                {/* Search Input */}
                <div className="flex-1 w-full">
                    <Label htmlFor="search">Search Courses</Label>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search by course name or description..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full"
                    />
                </div>

                {/* Department Dropdown */}
                <div className="w-full md:w-64">
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={handleDepartmentChange} value={selectedDepartmentCode}>
                        <SelectTrigger id="department" className="w-full">
                            <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[500px] overflow-y-auto">
                            {DEPARTMENTS.map((dept) => (
                                <SelectItem key={dept.code} value={dept.code}>
                                    {dept.name} ({dept.code})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Sorting Dropdown */}
                <div className="w-full md:w-64">
                    <Label htmlFor="sort">Sort By</Label>
                    <Select onValueChange={handleSortChange} value={selectedSortOption}>
                        <SelectTrigger id="sort" className="w-full">
                            <SelectValue placeholder="Sort Options" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="courseNumber_asc">Course Number (Asc)</SelectItem>
                            <SelectItem value="courseNumber_desc">Course Number (Desc)</SelectItem>
                            <SelectItem value="rating_asc">Average Rating (Asc)</SelectItem>
                            <SelectItem value="rating_desc">Average Rating (Desc)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* CourseList Component */}
            <CourseList departmentCode={selectedDepartmentCode} sortBy={selectedSortOption} query={searchQuery}/>
        </div>
    );
}

export default Home;