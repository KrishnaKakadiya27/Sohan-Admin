import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../../axiosInstance';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress, List, ListItem } from '@mui/material';
import SearchBar from '../../../components/common/SearchBar';

const SelectCategoryDialog = ({ open, setCatId, setOpen, catIdName ,setSelectCatFlag}) => {

  const [categories, setCategories] = useState([]);
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

  // Fetch categories data
  const fetchCategories = async (currentPage) => {
    try {
      const response = await axiosInstance.get(`/categoryMaster?page=${currentPage}&records_per_page=${recordsPerPage}`);
      const newCategories = response.data.payload.data;

      setCategories((prev) => [...prev, ...newCategories]);
      setHasMore(newCategories.length > 0);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Initial load
  useEffect(() => {
    if (open) {
      setCategories([]);
      setPage(1);
      fetchCategories(1);
    }
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
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="max-h-[400px] h-auto w-full overflow-auto" id="scrollableDiv">
        <InfiniteScroll
          dataLength={categories.length}
          next={loadMore}
          hasMore={hasMore}
          loader={!hasMore ? <CircularProgress /> : ""}
          scrollableTarget="scrollableDiv"
          style={{ overflow: "hidden", width: "100%" }}
        >
          <List>
            {categories.map((category, index) => (
              <ListItem
                button
                key={category.uuid || index}
                sx={{ px: "25px", py: "10px", cursor: "pointer" }}
                onClick={() => {
                  setCatId({ id: category.category_master_id, uuid: category.uuid, name: category.name });
                  setSelectCatFlag(true);
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

export default SelectCategoryDialog