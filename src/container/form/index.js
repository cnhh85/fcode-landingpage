import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import Image from '../../assets/form/bg.png';
import { put } from '../../utils/apiCaller';
import Popup from './popup';
import {
    SectionWrapper,
    FormContainer,
    FormContent,
    ImageContainer,
    FormImage,
    FormTitle,
    FormHead,
    FormDetail,
    FormWrap,
    Label,
    NameInput,
    InputSmall,
    InputSmallLeft,
    OptionContainer,
    Select,
    Option,
    SmallSelect,
    FormLineWrap,
    Input,
    CheckBox,
    SubmitButton,
} from './style.js';

const initialFormData = Object.freeze({
    lname: '',
    fname: '',
    spec: 'Kĩ thuật phần mềm',
    id: '',
    sem: 'LUK1',
    phone: '',
    confirm: false,
});

const Form = () => {
    const [popupSpec, setPopupSpec] = useState({ isShowing: false, type: '', content: '' });
    const [submit, setSubmit] = useState(initialFormData);
    const history = useHistory();
    const token = window.localStorage.getItem('token');
    const handleChange = (e) => {
        setSubmit({
            ...submit,
            [e.target.name]:
                e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim(),
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submit.lname === '' || submit.id === '' || submit.fname === '' || submit.phone === '') {
            setPopupSpec({ isShowing: true, type: 'missing' });
            return;
        }
        if (!submit.confirm) {
            setPopupSpec({ isShowing: true, type: 'notConfirmed' });
            return;
        }
        const tmp = await put(
            '/students',
            {
                phone: submit.phone,
                name: submit.lname + submit.fname,
                studentCode: submit.id,
                major: submit.spec,
                semester: submit.sem,
            },
            {},
            {
                Authorization: token,
            }
        ).then((res) => {
            const response = res.data.status.message;
            if (response === 'Invalid phone number!') {
                return {
                    isShowing: true,
                    type: 'notConfirmed',
                    content: 'Số điện thoại không hợp lệ',
                };
            }
            if (response === 'Invalid name!') {
                return {
                    isShowing: true,
                    type: 'notConfirmed',
                    content: 'Tên nhập vào không hợp lệ',
                };
            }
            if (response === 'Invalid student code!') {
                return {
                    isShowing: true,
                    type: 'notConfirmed',
                    content: 'Mã số sinh viên không hợp lệ',
                };
            }
            if (response === 'Already registered!!') {
                return {
                    isShowing: true,
                    type: 'notConfirmed',
                    content: 'Bạn đã đăng kí rồi',
                };
            }
            if (response === 'Registered successfully!') {
                return { isShowing: true, type: 'success' };
            }
        });
        setPopupSpec(tmp);
    };
    return (
        <SectionWrapper>
            {popupSpec.isShowing ? (
                <Popup
                    type={popupSpec.type}
                    close={() => setPopupSpec({ isShowing: false, type: '' })}
                    redirect={() => history.push('/register')}
                    content={popupSpec.content}
                />
            ) : null}
            <FormContainer>
                <FormContent>
                    <FormTitle>
                        <FormHead>Đăng kí</FormHead>
                        <FormDetail>
                            Bạn điền đầy đủ các thông tin dưới đây để nhận thử thách sắp tới từ CLB
                            nhé!
                        </FormDetail>
                    </FormTitle>
                    <FormWrap>
                        <Label>Tên</Label>
                        <NameInput>
                            <InputSmallLeft
                                type="text"
                                name="lname"
                                placeholder="Nhập tên của bạn"
                                onChange={(e) => handleChange(e)}
                            ></InputSmallLeft>
                            <InputSmall
                                type="text"
                                name="fname"
                                placeholder="Nhập họ của bạn"
                                onChange={(e) => handleChange(e)}
                            ></InputSmall>
                        </NameInput>
                        <Label htmlFor="spec">Ngành học</Label>
                        <Select id="spec" name="spec" onChange={(e) => handleChange(e)}>
                            <Option value="Kĩ thuật phần mềm">Kĩ thuật phần mềm</Option>
                            <Option value="Trí tuệ nhân tạo">Trí tuệ nhân tạo</Option>
                            <Option value="An toàn thông tin">An toàn thông tin</Option>
                            <Option value="Hệ thống thông tin">Hệ thống thông tin</Option>
                            <Option value="IoT (Internet of Things)">
                                IoT (Internet of Things)
                            </Option>
                            <Option value="hiết kế Mỹ thuật số">Thiết kế Mỹ thuật số</Option>
                            <Option value="Kinh doanh quốc tế">Kinh doanh quốc tế</Option>
                            <Option value="Quản trị kinh doanh">Quản trị kinh doanh</Option>
                            <Option value="Truyền thông đa phương tiện">
                                Truyền thông đa phương tiện
                            </Option>
                            <Option value="Digital Marketing">Digital Marketing</Option>
                            <Option value="Quản trị dịch vụ du lịch & lữ hành">
                                Quản trị dịch vụ du lịch & lữ hành
                            </Option>
                            <Option value="Quản trị khách sạn">Quản trị khách sạn</Option>
                            <Option value="Ngôn ngữ Anh">Ngôn ngữ Anh</Option>
                            <Option value="Ngôn ngữ Nhật">Ngôn ngữ Nhật</Option>
                            <Option value="Ngôn ngữ Hàn Quốc">Ngôn ngữ Hàn Quốc</Option>
                        </Select>
                        <OptionContainer>
                            <FormLineWrap>
                                <Label>Mã số sinh viên</Label>
                                <InputSmallLeft
                                    type="text"
                                    id="studentId"
                                    name="id"
                                    placeholder="SE170000"
                                    onChange={(e) => handleChange(e)}
                                ></InputSmallLeft>
                            </FormLineWrap>
                            <FormLineWrap>
                                <Label htmlFor="sem">Kì học hiện tại</Label>
                                <SmallSelect id="sem" name="sem" onChange={(e) => handleChange(e)}>
                                    <Option value="LUK1">LUK1</Option>
                                    <Option value="LUK2">LUK2</Option>
                                    <Option value="LUK3">LUK3</Option>
                                    <Option value="LUK4">LUK4</Option>
                                    <Option value="LV5">LV5</Option>
                                    <Option value="LV6">LV6</Option>
                                    <Option value="CN1">CN1</Option>
                                    <Option value="CN1">CN2</Option>
                                    <Option value="CN1">CN3</Option>
                                    <Option value="CN1">CN4</Option>
                                    <Option value="CN1">CN5</Option>
                                    <Option value="CN1">CN6</Option>
                                    <Option value="CN1">CN7</Option>
                                    <Option value="CN1">CN8</Option>
                                    <Option value="CN1">CN9</Option>
                                </SmallSelect>
                            </FormLineWrap>
                        </OptionContainer>
                        <Label>Số điện thoại</Label>
                        <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="0987654321"
                            onChange={(e) => handleChange(e)}
                        ></Input>
                        <CheckBox
                            type="checkbox"
                            id="confirm"
                            name="confirm"
                            checked={submit.confirm}
                            onChange={(e) => handleChange(e)}
                        ></CheckBox>
                        <Label htmlFor="confirm">Tôi đồng ý tham gia thử thách của CLB FCode</Label>
                    </FormWrap>
                    <SubmitButton onClick={(e) => handleSubmit(e)}>ĐĂNG KÍ</SubmitButton>
                </FormContent>
                <ImageContainer>
                    <FormImage src={Image} draggable="false"></FormImage>
                </ImageContainer>
            </FormContainer>
        </SectionWrapper>
    );
};

export default Form;
