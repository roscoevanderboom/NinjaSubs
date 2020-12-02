import React, { useContext, useState, useEffect } from "react";
// Store
import store from 'state';
// Locations array
import { taiwan } from 'constants/locations';
// Actions
import { handleProfileData } from '../../../actions/user';
// @material-ui/core components
import {
    Chip, Container, Collapse, ListItem,
    ListItemText, ListItemIcon
} from "@material-ui/core";
// @material-ui/icons
import { ExpandLess, ExpandMore } from "@material-ui/icons";

export default () => {
    const { state } = useContext(store);
    const { profileData, user } = state;
    const { Taipei, Taoyuan, newTaipei } = taiwan.Taipei;
    // Component State
    const [taipeiChips, setTaipeiChips] = useState([]);
    const [newTaipeiChips, setNewTaipeiChips] = useState([]);
    const [taoyuanChips, setTaoyuanChips] = useState([]);

    const [collapse, setCollapse] = useState({
        newTaipei: false,
        taipei: false,
        taoyuan: false
    })

    const locationSwitch = (key, location) => {
        switch (key) {
            case 'remove':
                return { locations: profileData.locations.filter(dist => dist !== location) };
            case 'add':
                return { locations: profileData.locations.concat(location) };
            default:
                break;
        }
    }
    const handleLocations = location => () => {
        handleProfileData({
            action: 'update',
            user,
            data: profileData.locations.includes(location)
                ? locationSwitch('remove', location)
                : locationSwitch('add', location)
        })
    }
    const filterChips = (array, key) => {
        let newArray = []
        array.forEach(dist => {
            if (profileData.locations.includes(dist)) {
                newArray.push({
                    name: dist,
                    variant: 'outlined',
                    color: 'primary'
                })
                return;
            }
            newArray.push({
                name: dist,
                variant: 'default'
            })
        })
        switch (key) {
            case 'newTaipei':
                setNewTaipeiChips(newArray);
                break;
            case 'taoyuan':
                setTaoyuanChips(newArray);
                break;
            default:
                setTaipeiChips(newArray);
                break;
        }
    }
    const handleCollapse = dist => () => {
        setCollapse({
            ...collapse,
            [dist]: collapse[dist] ? false : true
        })
    }
    const CustomCollapse = (props) => {
        const { chipsArray, title, stateKey } = props;
        return (
            <React.Fragment>
                <ListItem
                    className='rounded border border-primary mb-2'
                    button onClick={handleCollapse(stateKey)}>
                    <ListItemText>
                        {title}
                    </ListItemText>
                    <ListItemIcon className='justify-content-end'>
                        {collapse[stateKey] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemIcon>
                </ListItem>
                <Collapse in={collapse[stateKey]}>
                    {chipsArray.map((chip, i) =>
                        <Chip key={i}
                            onClick={handleLocations(chip.name)}
                            className="m-1"
                            label={chip.name}
                            clickable={true}
                            color={chip.color}
                            variant={chip.variant} />
                    )}
                </Collapse>
            </React.Fragment>
        )
    }

    useEffect(() => {
        if (profileData.locations !== undefined) {
            let zones = [newTaipei, Taipei, Taoyuan]
            let keys = ['newTaipei', 'taipei', 'taoyuan']
            zones.map((zone, i) => filterChips(zone, keys[i]));
        }
        // eslint-disable-next-line
    }, [profileData.locations])


    return (
        <Container className='mt-3 mb-3'>
            <CustomCollapse
                stateKey='taipei'
                title='Taipei'
                chipsArray={taipeiChips} />

            <CustomCollapse
                stateKey='newTaipei'
                title='New Taipei'
                chipsArray={newTaipeiChips} />

            <CustomCollapse
                stateKey='taoyuan'
                title='Taoyuan'
                chipsArray={taoyuanChips} />
        </Container>
    )
}