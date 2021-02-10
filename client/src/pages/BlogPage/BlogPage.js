import React, { useEffect } from "react";
import Blogs from "../../components/Blogs/Blogs";
import Image from "../../components/Image/Image";
import { useSelector } from "react-redux";
import { getBlogs, getBlogsIsLoading } from "../../store/Blogs/selectors";
import { useLocation } from "react-router-dom";
import SectionHeading from "../../components/generalComponents/SectionHeading/SectionHeading";
import "./BlogPage.scss";
import Loader from "../../components/Loader/Loader";

const BlogPage = ({ match }) => {
  const blogsData = useSelector(getBlogs);
  const isLoading = useSelector(getBlogsIsLoading);
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])


  if(isLoading) {
    return <Loader />
  }

  const mainClassName = "blog-page";
  const blogId = match.params.id;
  const blog = blogsData.find(e => e._id === blogId);
  const { fullText, date, photo, title } = blog;
  const correctDate = new Date(+date);
  const correctNums = (day) => {
    let num = day ? correctDate.getDate() : correctDate.getMonth() + 1;
    if(num < 10) {
      num = "0" + num;
    }
    return num
  }
  const dateDDMMYYY = correctNums(true) + "." + correctNums() + "." + correctDate.getFullYear();

  const errorBlogImg = "/img/blogs/error-blog.jpg";
  const errorBlogTitle = "Ой, кажется такой блог не найден!";
  const errorBlogDescr = "Если не хочешь езить на таком же авто, свяжись с нами или выбери другую новость ниже на странице.";

  const pageContent = blog
    ?
      <>
        <Image src={photo} className={`${mainClassName}__img`} alt="blog-img"/>
        <div className={`${mainClassName}__side-line`}>
          <div className={`${mainClassName}__text-content`}>
            <SectionHeading text={title} className={`${mainClassName}__header`}/>
            <p className={`${mainClassName}__date`}>{dateDDMMYYY}</p>
            <div className={`${mainClassName}__text`}>
              <p className={`${mainClassName}__text-paragraph`}>{fullText}</p>
            </div>
          </div>
        </div>
      </>
    :
      <>
        <Image src={errorBlogImg} className={`${mainClassName}__img`} alt="blog-img"/>
        <div className={`${mainClassName}__side-line`}>
          <div className={`${mainClassName}__text-content`}>
            <SectionHeading text={errorBlogTitle} className={`${mainClassName}__header`}/>
            <SectionHeading text={errorBlogDescr} className={`${mainClassName}__header`}/>
          </div>
        </div>
      </>




  return (
    <div className={`${mainClassName}__container`}>
      {pageContent}
      <div className={`${mainClassName}__other-blogs`}>
        <Blogs id={blogId}/>
      </div>

    </div>
  );
};

export default BlogPage;