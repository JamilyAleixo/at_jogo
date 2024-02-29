import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Button from "../../components/button";
import * as C from "./styles";
import knex from "../../knex/config/database";

const Cadastro = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [erro, setErro] = useState('');
  const [isCheckedInicio, setIsCheckedInicio] = useState(false);
  const [isCheckedFinal, setIsCheckedFinal] = useState(false);
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [nota, setNota] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [jogoData, setJogoData] = useState({
    NM_JOGO: '',
    CD_STATUS: '',
    DT_INICIAL: null,
    DT_FINAL: null,
    NOTA_AVALIACAO: null,
    IMAGEM: ''
  });

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const options = await knex('status_jogo').select('*');
        setStatusOptions(options);
      } catch (error) {
        console.error('Erro ao obter opções de status:', error);
      }
    };

    fetchStatusOptions();
  }, []);


  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Você só pode enviar arquivos JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('A imagem deve ter menos de 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadImg = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await uploadImg(file.originFileObj, (result) => {
        setPreviewImage(result);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      });
    }
    setPreviewOpen(true);
  };

  const handleDelete = () => {
    setImageUrl('');
    setPreviewOpen(false);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      uploadImg(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJogoData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const setOpcoes = await knex('status_jogo').select('*');
      console.log('Resultados da tabela status_jogo:', setOpcoes);
  
      if (!jogoData.NM_JOGO || !selectedStatus) {
        setErro("Preencha todos os campos obrigatórios");
        return;
      }
  
      const [newJogoId] = await knex('ls_jogo').insert(jogoData);
  
      console.log('ID do novo jogo inserido:', newJogoId);
      navigate("/"); // Navegar para a página principal após o cadastro
  
    } catch (error) {
      console.error('Erro ao cadastrar jogo:', error);
    }
  };

  return (
    <C.Container>
      <C.Content>
        <C.Label>CADASTRAR JOGO</C.Label>
        <C.Row>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            onPreview={handlePreview}
          >
            {imageUrl ? (
              <div>
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '80%',
                  }}
                />
                <div className="image-delete-button" onClick={handleDelete}>
                  Excluir imagem
                </div>
              </div>
            ) : (
              <button
                style={{
                  border: 0,
                  background: 'none',
                }}
                type="button"
              >
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                  style={{
                    marginTop: 8,
                  }}
                ></div>
              </button>
            )}
          </Upload>

          <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>

          <C.ContainerInput>
            <C.Input
              type="text"
              placeholder="Nome do jogo"
              name="NM_JOGO"
              value={jogoData.NM_JOGO}
              onChange={handleInputChange}
            />
          </C.ContainerInput>

          <C.NTinput
            type="number"
            placeholder="Nota"
            name="NOTA_AVALIACAO"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </C.Row>

        <C.DtCheck>
          <div className="date-input">
            <div>
              <input
                type="checkbox"
                id="DT_INICIAL"
                name="DT_INICIAL"
                checked={isCheckedInicio}
                onChange={() => setIsCheckedInicio(!isCheckedInicio)}
              />
              <label htmlFor="DT_INICIAL"> Data Inicial</label>
            </div>
            {isCheckedInicio && (
              <div>
                <label htmlFor="DT_INICIAL"> </label>
                <input
                  type="date"
                  value={dataInicial}
                  onChange={(e) => setDataInicial(e.target.value)}
                />
              </div>
            )}
            <div>
              <input
                type="checkbox"
                id="DT_FINAL"
                name="DT_FINAL"
                checked={isCheckedFinal}
                onChange={() => setIsCheckedFinal(!isCheckedFinal)}
              />
              <label htmlFor="DT_FINAL"> Data Final</label>
            </div>
            {isCheckedFinal && (
              <div>
                <label htmlFor="DT_FINAL"> </label>
                <input
                  type="date"
                  id="DT_FINAL"
                  name="DT_FINAL"
                  value={dataFinal}
                  onChange={(e) => setDataFinal(e.target.value)}
                />
              </div>
            )}
          </div>
        </C.DtCheck>

        <C.Label1> Status </C.Label1>
        <C.Form>
          {statusOptions.map((status) => (
            <div key={status.CD_STATUS} className="form">
              <input
                className="form-check-input"
                type="radio"
                name="form"
                id={`form${status.CD_STATUS}`}
                checked={selectedStatus === status.CD_STATUS}
                onChange={() => setSelectedStatus(status.CD_STATUS)}
              />
              <label htmlFor={`form${status.CD_STATUS}`}>
                {status.NM_STATUS}
              </label>
            </div>
          ))}
        </C.Form>

        <C.LabelError>{erro}</C.LabelError>
        <div>
          <Button Text="Salvar" onClick={handleSubmit}/>
          <Link to="/"><Button Text="Cancelar">&nbsp;</Button></Link>
        </div>
      </C.Content>
    </C.Container>
  );
};

export default Cadastro;
