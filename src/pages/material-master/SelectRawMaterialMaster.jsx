import { CircularProgress, List, ListItem } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosInstance from '../../axiosInstance';
import SearchBar from '../../components/common/SearchBar';

const SelectRawMaterialMaster = ({ open, setRawMaterialId, setOpen, rawMaterialIdName }) => {

    const [personName, setPersonName] = useState([]);
    const [page, setPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Ref to detect outside clicks
    const dialogRef = useRef(null);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // const handleOutsideClick = (event) => {
    //   if (dialogRef.current && !dialogRef.current.contains(event.target)) {
    //     setOpen(false);
    //   }
    // };

    // // Add event listener for outside click detection
    // useEffect(() => {
    //   if (open) {
    //     document.addEventListener("mousedown", handleOutsideClick);
    //   } else {
    //     document.removeEventListener("mousedown", handleOutsideClick);
    //   }

    //   return () => {
    //     document.removeEventListener("mousedown", handleOutsideClick);
    //   };
    // }, [open]);

    // Fetch personName data
    const fetchCategories = async (currentPage) => {
        try {
            const searchValue = searchTerm ? JSON.stringify({ search: searchTerm }) : ""
            const response = await axiosInstance.get(`/rawMaterialMaster?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`);
            const newCategories = response.data.payload.data;

            setPersonName((prev) => [...prev, ...newCategories]);
            setHasMore(newCategories.length > 0);
        } catch (error) {
            console.error("Error fetching personName:", error);
        }
    };

    // Initial load
    useEffect(() => {
        if (open) {
            setPersonName([]);
            setPage(1);
            fetchCategories(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, searchTerm]);

    // Fetch more data when scrolling
    const loadMore = () => {
        const nextPage = page + 1;
        fetchCategories(nextPage);
        setPage(nextPage);
    };
    return (
        <div
            ref={dialogRef}
            className="absolute bg-[white] w-full left-0 top-[52px] z-40 mb-5"
            style={{
                boxShadow: "0px 4px 8px 0px #00000026",
                display: open ? "block" : "none",
            }}
        >
            <div className="p-[10px] w-full">
                <SearchBar onSearch={handleSearch} wFull />
            </div>
            <div className="max-h-[400px] h-auto w-full overflow-auto" id="scrollableDiv">
                <InfiniteScroll
                    dataLength={personName.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={!hasMore ? <CircularProgress /> : ""}
                    scrollableTarget="scrollableDiv"
                    style={{ overflow: "hidden", width: "100%" }}
                >
                    <List>
                        {personName.map((person, index) => (
                            <ListItem
                                button
                                key={person.uuid || index}
                                sx={{ px: "25px", py: "10px", cursor: "pointer" }}
                                onClick={() => {
                                    setRawMaterialId({ id: person.raw_material_master_id, uuid: person.uuid, name: person.name });
                                    setOpen(false);
                                }}
                            >
                                {person.name}
                            </ListItem>
                        ))}
                    </List>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default SelectRawMaterialMaster