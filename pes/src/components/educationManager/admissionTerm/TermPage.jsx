import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {Add, FilterList} from '@mui/icons-material';
import {useEffect, useState} from "react";
import {getTermYears} from "@services/educationService.jsx";
import {enqueueSnackbar} from "notistack";
import TermTable from "./TermTable.jsx";

export default function TermPage({terms, onDetailClick, onCreateClick}) {
    const [years, setYears] = useState(['all']);
    const [selectedYear, setSelectedYear] = useState('all');

    useEffect(() => {
        const fetchYears = async () => {
            try {
                const response = await getTermYears();
                if (response.success) {
                    // Sort years in descending order (chuỗi dạng "2025–2026")
                    const sortedYears = [...response.data].sort((a, b) => b.localeCompare(a));
                    setYears(['all', ...sortedYears]);
                } else {
                    enqueueSnackbar('Failed to fetch years:', response.message);
                }
            } catch (error) {
                enqueueSnackbar('Error fetching years:', error);
            }
        };
        fetchYears();
    }, []);

    const formatYear = (year) => {
        if (year === 'all') return 'All Years';
        return year;
    };

    // Đảm bảo selectedYear và year cùng định dạng (string)
    const filteredTerms = selectedYear === 'all'
        ? terms.filter(term => !term.isExtraTerm)
        : terms.filter(term => {
            // Normalize: thay tất cả dấu '-' bằng en dash '–'
            let termYearStr = typeof term.year === 'string'
                ? term.year.replace(/-/g, '–')
                : `${term.year}–${Number(term.year) + 1}`;
            console.log("term.year:", term.year, "termYearStr:", termYearStr, "selectedYear:", selectedYear);
            return termYearStr === String(selectedYear) && !term.isExtraTerm;
        });
    console.log("All terms: ", terms);
    console.log("Selected year: ", selectedYear);
    console.log("filteredTerms: ", filteredTerms);

    return (
        <div className="container">
            <Box sx={{mt: 2, mb: 2}}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                        textAlign: 'center',
                        fontFamily: 'inherit',
                        letterSpacing: 1,
                        mb: 1,
                        color: '#07663a'
                    }}
                >
                    Term Admission
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 500,
                        fontFamily: 'inherit'
                    }}
                >
                    Manage the terms for student admission
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                mx: {xs: 0, md: 2}
            }}>
                <FormControl sx={{minWidth: 200}}>
                    <Select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        displayEmpty
                        sx={{
                            height: '44px',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#07663a',
                                borderWidth: '2px'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#07663a',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#07663a',
                            },
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }
                        }}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <FilterList sx={{color: '#07663a', fontSize: 20}}/>
                                <Typography sx={{color: '#07663a', fontWeight: 500}}>
                                    {selected === 'all' ? 'Filter by Year' : `Year: ${formatYear(selected)}`}
                                </Typography>
                            </Box>
                        )}
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {formatYear(year)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    endIcon={<Add/>}
                    onClick={onCreateClick}
                    sx={{
                        minWidth: 180,
                        height: 44,
                        borderRadius: '10px',
                        fontWeight: 600,
                        fontSize: 14,
                        backgroundColor: '#07663a',
                        boxShadow: 2,
                        '&:hover': {
                            backgroundColor: '#05512e'
                        }
                    }}
                >
                    Create new term
                </Button>
            </Box>

            <TermTable
                terms={filteredTerms}
                onDetailClick={onDetailClick}
            />
        </div>
    );
}
