import React, { PropTypes } from 'react';
import { Card, CardText, CardTitle, CardBlock } from 'reactstrap';

const ButtonLink = ({ title, url }) =>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary"
    >
        {title}
    </a>;

const IconLink = ({ title, url, icon }) =>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-link"
    >
        <span className={icon} />
        <span className="sr-only">{title}</span>
    </a>

export const AppCard = ({
    title,
    description,
    iconLink,
    actionLink
}) =>
    <Card>
        <CardBlock>
            <CardTitle className="text-capitalize">{title}</CardTitle>
            <CardText>{description}</CardText>
            <div className="d-flex justify-content-between">
                {actionLink &&
                    <ButtonLink
                      title={actionLink.title}
                      url={actionLink.url}
                    />
                }
                {iconLink &&
                    <IconLink
                      title={iconLink.title}
                      url={iconLink.url}
                      icon={iconLink.icon}
                      className="align-self-end"
                    />
                }
            </div>
        </CardBlock>
    </Card>;

AppCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconLink: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    }),
    actionLink: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })
};

AppCard.defaultProps = {
    iconLink: null,
    actionLink: null
};

export default AppCard;
