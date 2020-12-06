import React from "react";
// Locations array
import { mainDistricts, subDistricts } from 'constants/locations';
// @material-ui/core components
import CustomCollapse from "./Districts-Collapse";
import Container from "@material-ui/core/Container";

export default () => {

    return (
        <Container className='mt-3 mb-3'>
            {mainDistricts.map((zone, i) =>
                <CustomCollapse
                    key={i}
                    title={zone}
                    districts={subDistricts[i]} />
            )}
        </Container>
    )
}