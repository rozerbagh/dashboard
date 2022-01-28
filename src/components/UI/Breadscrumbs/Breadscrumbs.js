import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Collapse from "@material-ui/core/Collapse";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function CustomSeparator(props) {
    const { staticContext, links, ...rest } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <div className="breadcrumbs-container" {...rest}>
            <Breadcrumbs
                separator={<NavigateNextIcon
                    key={`customseparator-text-${new Date().getTime()}`}
                    fontSize="small"
                    color="primary" />}
                aria-label="breadcrumb"
            >
                {links.map((ele, index) => {
                    if (ele.subroutes !== null && ele.subroutes.length > 0) {
                        return <div className="pos-rel">
                            <span
                                className="blue-text pointer font400"
                                onClick={() => setOpen(!open)}
                                color="primary"
                                key={`breadcrumbs-text-${index}`}>
                                {ele.label}
                            </span>
                            <Collapse in={open} timeout="auto" unmountOnExit key={`key-for-breadcrumbs-${index}`} className="breadcrumbs-dropdown">
                                <ul className="Tooltip cc-action-box">
                                    {ele.subroutes.map((e, i) =>
                                        <li>
                                            <Link to={e.link} key={`breadcrumbs-sublink-${index}${i}`}>
                                                {e.label}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </Collapse>
                        </div>

                    } else {
                        return ele.link === null ?
                            <Typography color="textPrimary" key={`breadcrumbs-text-${index}`}>{ele.label}</Typography> :
                            <Link to={ele.link} key={`breadcrumbs-link-${index}`}>{ele.label}</Link>
                    }
                })
                }
            </Breadcrumbs>
        </div>
    );
}
