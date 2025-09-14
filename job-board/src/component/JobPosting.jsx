const JobPosting = ({url,title,by,time})=>{
    const formatedTime = new Date(time*1000).toLocaleString()

    return <div className="post" role="listItems">
        <h2 className="post__title">
            <a className={url?"":"inactiveLink"} target="blank" rel="noopener" href={url}>{title}</a>
        </h2>
        <span className="post__metadata">
            By {by}.{formatedTime}
        </span>
        </div>
}

export default JobPosting;