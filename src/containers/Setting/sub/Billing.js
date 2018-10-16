import React from 'react';
import common from 'components/common'
import { ActivationSwitchInput } from '../../../components/common/Buttons';
// import { MainTitle } from '../../../components/common/Titles';
import Tabel from 'components/common/Tabels'
const {
    InputRow,
    HeadeLine,
    BigText,
    FlexBoxesContainer,
    MainBlock,
    MainTitle,
    Button,
    Box,
    SmallButton,
    SpcialAnnouncement } = common




export default props => (
    <React.Fragment>
        <MainBlock title='LeadCart Plan' blockHandel={<Button classes='light-red-color'>
            Cancel</Button>
        } />
        <FlexBoxesContainer>
            <Box
                header={<HeadeLine>$199/month</HeadeLine>}
                content={
                    <BigText>
                        <div>Pro</div>
                        <div>Package</div>
                    </BigText>
                }
                footer={
                    <FlexBoxesContainer classes={['space-between-elements']}>
                        <div>
                            <InputRow.Label>Nex billing date</InputRow.Label>
                            <div>Sep 25, 2018</div>
                        </div>
                        <div>
                            <SmallButton classes='green-color' >Active</SmallButton>
                        </div>
                    </FlexBoxesContainer>
                }
            />
            <Box
                content={
                    <span className="plan-card-action stick-note-icon">
                        <SpcialAnnouncement >want to change your plan?</SpcialAnnouncement>
                        <SpcialAnnouncement classes={['blue-text']}>click here!</SpcialAnnouncement>
                    </span>
                } />
        </FlexBoxesContainer>

        <MainTitle>One-Time Charges</MainTitle>
        <Tabel>
            <Tabel.Head>
                <Tabel.HeadCell>Product Name</Tabel.HeadCell>
                <Tabel.HeadCell>Quantity</Tabel.HeadCell>
                <Tabel.HeadCell>Amount</Tabel.HeadCell>
                <Tabel.HeadCell>Status</Tabel.HeadCell>
                <Tabel.HeadCell>Date</Tabel.HeadCell>
            </Tabel.Head>
            <Tabel.Body>
                <Tabel.Row>
                    <Tabel.Cell
                        mainContent='-'
                    />
                    <Tabel.Cell
                        mainContent="-"
                    />
                    <Tabel.Cell
                        mainContent="-"
                    />
                    <Tabel.Cell>
                        <SmallButton classes='gray-color' >UnKnown</SmallButton>
                    </Tabel.Cell>
                    <Tabel.Cell
                        mainContent='-'
                    />
                </Tabel.Row>
            </Tabel.Body>
        </Tabel>
    </React.Fragment>
);
