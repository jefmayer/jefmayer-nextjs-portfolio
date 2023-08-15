import * as React from 'react';
import PropTypes from 'prop-types';

function ProjectDetails({
  id,
  invertText,
  projectLink,
  projectTitlePart1,
  projectTitlePart2,
  overview,
  solution,
}) {
  return (
    <section className={`project-details project-details-${id}`}>
      <div className="project-details-inner">
        <div className="project-title">
          <div className={`project-logo ${id}-logo`} />
          <h2 className={`heading-lg${invertText ? '' : ' inverted'}`}>
            {projectTitlePart1
            && (
              <strong>
                {projectTitlePart1}
                &nbsp;
              </strong>
            )}
            {projectTitlePart2}
          </h2>
        </div>
        <div className="project-overview">
          <h3 className={`heading-sm${invertText ? '' : ' inverted'}`}>Overview</h3>
          <p className={`body-regular${invertText ? '' : ' inverted'}`}>{overview}</p>
        </div>
        <div className="project-solution">
          <h3 className={`heading-sm${invertText ? '' : ' inverted'}`}>Solution</h3>
          <p className={`body-regular${invertText ? '' : ' inverted'}`}>{solution}</p>
        </div>
      </div>
      {projectLink
      && (
        <div className="project-link-wrapper">
          <a href={projectLink} className={`project-link${invertText ? '' : ' inverted'}`} target="_blank" rel="noreferrer">
            <span>
              <span>View Site</span>
            </span>
          </a>
        </div>
      )}
    </section>
  );
}

ProjectDetails.propTypes = {
  id: PropTypes.string.isRequired,
  invertText: PropTypes.bool.isRequired,
  projectLink: PropTypes.string.isRequired,
  projectTitlePart1: PropTypes.string.isRequired,
  projectTitlePart2: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  solution: PropTypes.string.isRequired,
};

export default ProjectDetails;
