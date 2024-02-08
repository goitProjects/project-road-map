import { useDispatch, useSelector } from 'react-redux';
import {
  BtnBox,
  BtnSection,
  SectionHead,
  InfoBtn,
  SaveBtn,
  StyledTitle,
  StyledLink,
  StyledNav,
  StyledText,
  StyledSpan,
  Line,
  StyledTHead,
  THeadRow,
  SubRow,
} from '../CarWorkingInfo/CarWorkingInfo.styled';

import {
  GlobalStyle,
  MainContainer,
  PaperSection,
  VerticalContainer,
  HorizontalContainer,
  MainInformationContainer,
  Paragraph,
  ParagraphContainer,
  Title,
  Riddle,
  Space,
  PaperWrapper,
  TableSection,
  StyledTable,
  StyledTBody,
  Accent,
  StyledTable2,
  TableSection2,
  StyledTHead2,
  TableSection3,
  StyledTable3,
  StyledTHead3,
} from './CarGeneralInformation.styled';
import downloadMainList from '../../../redux/download/operations';

import React, { useState } from 'react';
import ModalMainField from '../ModalMainField/ModalMainField';
import ModalFuel from '../ModalFuel/ModalFuel';
import {

  selectForm,

} from 'redux/form/selectors';

import { setMainInfo, setPmm } from 'redux/form/slice';

const CarGeneralInformation = () => {
  const dispatch = useDispatch();

  const mainForm = useSelector(selectForm);


  const firstTableMarkup = [];
  const pmmMarkup = [];
  const [duplicated, setDuplicated] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFuelExpensesModalOpen, setIsFuelExpensesModalOpen] = useState(false);

  console.log('form', mainForm);
  const handlePrint = () => {
    window.print();
  };


  const saveExcel = () => {
    dispatch(downloadMainList(mainForm))
      .unwrap()
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const date = new Date();
        a.download = `roadList#${date.toLocaleDateString()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openFuelExpensesModal = () => {
    setIsFuelExpensesModalOpen(true);
  };

  const closeFuelExpensesModal = () => {
    setIsFuelExpensesModalOpen(false);
  };

  // +++


  const handleFMainData = data => {
    console.log('submitData', data);

    // Обработка данных, полученных из модального окна (например, обновление состояния или выполнение других действий)
    dispatch(setMainInfo(data));
  };
  // +++

  const handleFuelData = data => {
    // Обработка данных, полученных из модального окна (например, обновление состояния или выполнение других действий)
    dispatch(setPmm({ ...data }));
    console.log(data.length);
  };

  if (mainForm.documentNumber) {
    for (let i = 0; i < mainForm.formal.departureTime.length; i++) {
      firstTableMarkup.push(
        <StyledTBody key={i}>
          <td>{mainForm.supervisor.rank}</td>
          <td>{mainForm.supervisor.name}</td>
          <td>{mainForm.formal.departureDate[i].toLocaleDateString()}</td>
          <td>{mainForm.engineer.rank}</td>
          <td>{mainForm.engineer.name}</td>
          <td>{mainForm.formal.arrivalDate[i].toLocaleDateString()}</td>
          <td>
            {mainForm.formal.departureTime[i] +
              ' ' +
              mainForm.formal.departureDate[i].toLocaleDateString()}
          </td>
          <td>{mainForm.formal.departureKilo[i]}</td>
          <td>
            {mainForm.formal.arrivalTime[i] +
              ' ' +
              mainForm.formal.arrivalDate[i].toLocaleDateString()}
          </td>
          <td>{mainForm.formal.arrivalKilo[i]}</td>
        </StyledTBody>
      );
    }
  }
  if (mainForm.pmm.code.length) {
    console.log(mainForm);
    for (let i = 0; i < mainForm.pmm.name.length; i++) {
      pmmMarkup.push(
        <StyledTBody key={i}>
          <td>{mainForm.pmm.name[i]}</td>
          <td>{mainForm.pmm.code[i]}</td>
          <td>{mainForm.pmm.startCount[i]}</td>
          {console.log(mainForm.pmm.receivedDate)}
          <td>{mainForm.pmm.receivedDate[i].toLocaleDateString()}</td>
          <td>{mainForm.pmm.endCount[i]}</td>
          <td>{mainForm.pmm.receivedCount[i]}</td>
          <td>{mainForm.pmm.usedCount[i]}</td>
          <td>{mainForm.pmm.normCount[i]}</td>
          <td>{mainForm.pmm.ecoCount[i]}</td>
          <td>{mainForm.pmm.reuseCount[i]}</td>
        </StyledTBody>
      );
    }
  }
  return (

    <MainContainer>       
      <BtnSection>
        <SectionHead>
          <StyledTitle>Дорожній лист</StyledTitle>
          <BtnBox>
            <InfoBtn onClick={openModal}>Додати загальну інформацію</InfoBtn>
            <InfoBtn onClick={openFuelExpensesModal}>
              Додати витрати ПММ
            </InfoBtn>
            <SaveBtn onClick={saveExcel}>Зберегти в Excel</SaveBtn>
            <SaveBtn  onClick={handlePrint}>Друк сторінки</SaveBtn>
          </BtnBox>
        </SectionHead>
        <StyledNav>
          <StyledLink to="/papers/general">Загальна інформація</StyledLink>
          <StyledLink to="/papers/car">Робота машини</StyledLink>
        </StyledNav>
        <Line />
        <StyledText>
          Адреса збереження PDF:
          <StyledSpan>____</StyledSpan>
        </StyledText>
      </BtnSection>
      <PaperWrapper >
        <PaperSection className="printable" id="section-to-print">
          <VerticalContainer>
            <Title className="text-center pt-4">
              Корінець дорожнього листа №
              <Space className="w-[109px] ml-4">
                {mainForm.documentNumber}
              </Space>
            </Title>
            <ParagraphContainer className="flex items-end gap-10">
              <Paragraph className="ml-[65px] whitespace-nowrap pt-4">
                Марка машини
                <Space className="ml-2 w-[140px]">{mainForm.car.carName}</Space>
              </Paragraph>
              <Paragraph>
                Номерний знак машини
                <Space className="ml-2 w-[140px]">{mainForm.car.carSign}</Space>
              </Paragraph>
              <Paragraph>
                Марка причепа <Space className="ml-2 w-[140px]"></Space>
              </Paragraph>
            </ParagraphContainer>
            <ParagraphContainer className="flex items-end gap-10">
              <Paragraph className="ml-[65px] pt-4">
                Номерний знак причепа
                <Space className="ml-2 w-[140px]"></Space>
              </Paragraph>
              <Paragraph>
                Група експлуатації
                <Space className="ml-2 w-[140px]">
                  {mainForm.car.exploitationGroup}
                </Space>
              </Paragraph>
            </ParagraphContainer>
            <ParagraphContainer className="flex items-end gap-10">
              <Paragraph className="ml-[65px] pt-4">
                У розпорядження <Space className="ml-2 w-[185px]"></Space>
              </Paragraph>
              <Paragraph>
                Маршрут руху
                <Space className="ml-2 w-[320px]">{mainForm.route}</Space>
              </Paragraph>
            </ParagraphContainer>
            <ParagraphContainer className="flex items-end gap-6">
              <Paragraph className="ml-[65px] pt-4">
                Дорожній лист отримав <Space className="ml-2 w-[522px]"></Space>
              </Paragraph>
              <Paragraph>
                "
                <Space className="w-9 text-center">
                  {mainForm.documentDate ? mainForm.documentDate.getDay() : ''}
                </Space>
                "
                <Space className="ml-2 w-[53px] mr-2 text-center">
                  {mainForm.documentDate
                    ? mainForm.documentDate.toLocaleString('uk-ua', {
                        month: 'long',
                      })
                    : ''}
                </Space>
                2024 року
              </Paragraph>
            </ParagraphContainer>
            <Riddle className="text-center">
              (підпис, прізвище, ініціали)
            </Riddle>
          </VerticalContainer>
          <HorizontalContainer>
            <MainInformationContainer className="w-[1169px]">
              <Paragraph className=" text-center pt-5">
                Дійсний до "
                <Space className="w-[32px]">
                  {mainForm.documentDate ? mainForm.documentDate.getDay() : ''}
                </Space>
                "
                <Space className="w-[53px] mr-1.5 ml-4">
                  {mainForm.documentDate
                    ? mainForm.documentDate.toLocaleString('uk-ua', {
                        month: 'long',
                      })
                    : ''}
                </Space>
                2023 року
              </Paragraph>
              <Title className=" text-center pt-3">
                Дорожній лист №
                <Space className="w-[109px] ml-4">
                  {mainForm.documentNumber}
                </Space>
              </Title>
              <Paragraph className=" pl-32 pb-4 pt-5">
                Військова частина (підрозділ)
                <Space className="w-[216px] ml-2">
                  {mainForm.militaryUnit}
                </Space>
              </Paragraph>
              <ParagraphContainer className=" pl-32 flex gap-10 pt-5">
                <Paragraph>
                  Водій
                  <Space className="w-[385px] ml-2" >
                    <p className={'italic'}>
                    <span>{mainForm.car.driver.rank}</span>
                    <span>{mainForm.car.driver.name}</span></p>
                  </Space>
                </Paragraph>
                <Paragraph>
                  Старший машини
                  <Space className="w-[385px] ml-2">
                    <p className={'italic'}>
                      <span>{mainForm.supervisor.rank}</span>
                      <span>{mainForm.supervisor.name}</span></p>
                  </Space>
                </Paragraph>
              </ParagraphContainer>
              <ParagraphContainer className="flex gap-[369px]">
                <Riddle className="ml-[295px]">
                  (військове звання, прізвище,ініціали)
                </Riddle>
                <Riddle>(військове звання, прізвище,ініціали)</Riddle>
              </ParagraphContainer>
              <Paragraph className="pl-32 pt-5">
                Маршрут руху
                <Space className="ml-2 w-[803px]">{mainForm.route}</Space>
              </Paragraph>
              <Space className="pt-6 ml-32 w-[908px]">
              </Space>
              <ParagraphContainer className="flex gap-[335px]">
                <Riddle className="ml-[128px]">М.П.</Riddle>
                <Riddle>
                  (посада, військове звання, підпис, прізвище,ініціали)
                </Riddle>
              </ParagraphContainer>
            </MainInformationContainer>
            <TableSection>
            <StyledTable>
              <StyledTHead>
                <THeadRow>
                  <th scope="col" colSpan={3} rowSpan={3}>
                    Машина технічно справна
                    <Accent className="text-sm mt-2">
                      Старший (технік) підрозділу
                    </Accent>
                  </th>
                  <th scope="col" colSpan={3} rowSpan={3}>
                    Технічний стан машини перевірив
                    <Accent className="text-sm mt-2">Начальник КТП</Accent>
                  </th>

                  <th scope="colgroup" colSpan={2}>
                    <Accent className="text-sm mt-2">Вибуття</Accent>
                  </th>
                  <th scope="colgroup" colSpan={2}>
                    <Accent className="text-sm mt-2">Прибуття</Accent>
                  </th>
                </THeadRow>
                <SubRow>
                  <th scope="col">За нарядом</th>
                  <th scope="col">
                    <Accent>{mainForm.formal.documentDateCome ?`${mainForm.formal.documentDateCome}`: "0:00 00.00.0000"}</Accent>
                  </th>
                  <th scope="col">За нарядом</th>
                  <th scope="col">
                    <Accent>{mainForm.formal.documentDateLeave?`${mainForm.formal.documentDateLeave}`: "0:00 00.00.0000"}</Accent>
                  </th>
                </SubRow>
                <th scope="colgroup" colSpan={2}>
                  <Accent className="text-sm mt-2">Фактично</Accent>
                </th> <th scope="colgroup" colSpan={2}>
                  <Accent className="text-sm mt-2">Фактично</Accent>
                </th>
              </StyledTHead>
              {firstTableMarkup.length ? (
                firstTableMarkup
              ) : (
                <StyledTBody>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </StyledTBody>
              )}
              <StyledTBody>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </StyledTBody>
            </StyledTable>
          </TableSection>
          <TableSection2>
            <StyledTable2>
              <StyledTHead2>
                <THeadRow>
                  <th scope="colgroup">Номер документа</th>
                  <th scope="colgroup">Дата документа</th>
                  <th scope="colgroup">Підстава (мета виписки)</th>
                  <th scope="colgroup">Марка машини</th>
                  <th scope="colgroup">Номерний знак машини</th>
                  <th scope="colgroup">Марка причепа</th>
                  <th scope="colgroup">Номерний знак причепа </th>
                  <th scope="colgroup">Група експлуатації</th>
                  <th scope="colgroup">Вантаж, що перевозиться</th>
                  <th scope="colgroup">Маса вантажу,т</th>
                </THeadRow>
              </StyledTHead2>
              <StyledTBody>
                <td>{mainForm.documentNumber}</td>
                <td>
                  {mainForm.documentDate
                    ? mainForm.documentDate.toLocaleDateString()
                    : ''}
                </td>
                <td>{mainForm.purposeStatement}</td>
                <td>{mainForm.car.carName}</td>
                <td>{mainForm.car ? mainForm.car.carSign : ''}</td>
                <td></td>
                <td></td>
                <td>{mainForm.car.exploitationGroup}</td>
                <td></td>
                <td></td>
              </StyledTBody>
            </StyledTable2>
          </TableSection2>
          <TableSection3>
            <Paragraph className="text-center mb-4">
              Витрата пально-мастильних матеріалів (у літрах)
            </Paragraph>
            <StyledTable3>
              <StyledTHead3>
                <THeadRow>
                  <th scope="colgroup">Найменування ПММ</th>
                  <th scope="colgroup">Код номенклатури</th>
                  <th scope="colgroup">Наявність перед виїздом</th>
                  <th scope="colgroup" colSpan={2}>
                    Отримано
                  </th>
                  <th scope="colgroup">
                    Наявність під час постановки на стоянку
                  </th>
                  <th scope="colgroup">Витрачено</th>
                  <th scope="colgroup">Належить за нормою </th>
                  <th scope="colgroup">Економія </th>
                  <th scope="colgroup">Перевитрата</th>
                </THeadRow>
              </StyledTHead3>
              {pmmMarkup.length ? (
                pmmMarkup
              ) : (
                <StyledTBody>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </StyledTBody>
              )}
            </StyledTable3>
          </TableSection3>
          </HorizontalContainer>
          
        </PaperSection>
      </PaperWrapper>
      {isModalOpen && (
        <ModalMainField
          onClose={closeModal}
          onSubmitCallbackMain={handleFMainData}
        />
      )}
      {isFuelExpensesModalOpen && (
        <ModalFuel
          onCloseFuel={closeFuelExpensesModal}
          onSubmitCallback={handleFuelData}
          setDuplicated={setDuplicated}
        />
      )}
    </MainContainer>
  );
};
export default CarGeneralInformation;
