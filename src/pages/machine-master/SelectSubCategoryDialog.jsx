import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../axiosInstance';
import SearchBar from '../../components/common/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress, List, ListItem } from '@mui/material';

const SelectSubCategoryDialog = ({ catIdName, open, setOpen, setSubCatId, catId, categoryId, UUID,setSelectCatFlag }) => {
    const [subCategories, setSubCategories] = useState([]);
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
    // catId?.id?.id === undefined ? catId?.id === undefined ? UUID : catId?.id : catId?.id
    //   };
    // }, [open]);

    // Fetch subCategories data
    const fetchCategories = async (currentPage) => {
        try {
            const searchValue = JSON.stringify({
                category_master_id: typeof catId?.id === 'object'
                    ? catId.id?.id || UUID // If it's an object, check for 'id', otherwise use UUID
                    : catId?.id || UUID
            })
            const response = await axiosInstance.get(`/subCategoryMaster?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`);
            const newCategories = response.data.payload.data;

            setSubCategories((prev) => [...prev, ...newCategories]);
            setHasMore(newCategories.length > 0);
        } catch (error) {
            console.error("Error fetching subCategories:", error);
        }
    };

    // Initial load
    useEffect(() => {
        if (open) {
            setSubCategories([]);
            setPage(1);
            fetchCategories(1);
        }
    }, [open, searchTerm, catId]);

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
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="max-h-[400px] h-auto w-full overflow-auto" id="scrollableDiv">
                <InfiniteScroll
                    dataLength={subCategories.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={!hasMore ? <CircularProgress /> : ""}
                    scrollableTarget="scrollableDiv"
                    style={{ overflow: "hidden", width: "100%" }}
                >
                    <List>
                        {subCategories.map((category, index) => (
                            <ListItem
                                button
                                key={category.uuid || index}
                                sx={{ px: "25px", py: "10px", cursor: "pointer" }}
                                onClick={() => {
                                    setSubCatId({ id: category.category_master_id, uuid: category.uuid, name: category.name });
                                    setSelectCatFlag(false)
                                    setOpen(false);
                                }}
                            >
                                {category.name}
                            </ListItem>
                        ))}
                    </List>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default SelectSubCategoryDialog