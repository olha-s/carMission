import React from "react";
import BlogItem from "./BlogItem/BlogItem";
import SectionHeading from "../generalComponents/SectionHeading/SectionHeading";
import "./Blogs.scss";
import { useSelector } from "react-redux";
import {
  getBlogs,
  getBlogsIsLoading,
} from "../../store/Blogs/selectors";
import Loader from "../Loader/Loader";
import useLiveHashPush from "../../utils/hooks/useLiveHashPush";

const Blogs = ({ heading, anchorName }) => {
  const blogs = useSelector(getBlogs);
  const isLoading = useSelector(getBlogsIsLoading);
  const ref = useLiveHashPush(anchorName);

  const allBlogs = blogs.map((el) => (
    <BlogItem
      BlogCard={el}
      key={el._id}
      src={el.photo}
      title={el.title}
      text={el.text}
      fullText={el.fullText}
      buttonText={el.buttonText}
      date={el.date}
    />
  ));

  return (
    <section className="blogs__section" id={anchorName} ref={ref}>
      <SectionHeading text={heading} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="blogs__wrapper">
          {allBlogs}
        </div>
      )}
    </section>
  );
};

export default Blogs;
