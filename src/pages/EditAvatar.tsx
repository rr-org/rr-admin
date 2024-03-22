import { useNavigate, useParams } from "react-router-dom";
import { IQuiz } from "./Quiz";
import { useEffect, useState } from "react";
import API from "@app/utils/API";
import { ContentHeader } from "@app/components";
import { IAvatar } from "./Avatars";

const EditAvatar = () => {
    const [avatar, setAvatar] = useState<IAvatar>();
    const [image, setImage] = useState<File>();
    const [price, setPrice] = useState(0)
    const [isLocked, setIsLocked] = useState(false);
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    async function getAvatar() {
        const response = await API.get(`avatar/${id}`);
        setAvatar(response.data);
    }

    async function updateAvatar() {
        try {
            await API.patch(`avatar/${id}`, {
                image,
                price,
                isLocked,
                eqquiped: false
            });
            navigate('/avatar');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAvatar();
    }, [])

    return (
        <div>
          <ContentHeader title="Avatar" />
          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Avatar</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-widget="remove"
                      data-toggle="tooltip"
                      title="Remove"
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body" style={{ height: 400 }}>
                    {!avatar ? null : (
                        <form onSubmit={updateAvatar}>
                            <label className="form-label">Image</label>
                            <input className="form-control mb-3" type="file" onChange={(e) => setImage(e.target.files![0])} />
                            <label className="form-label">Price</label>
                            <input className="form-control mb-3" type ="number" value={Number(avatar.price)} onChange={(e) => setPrice(Number(e.target.value))}/>
                            <label className="form-label">isLocked</label>
                            <input className="form-control mb-3" type="checkbox" onChange={(e) => setIsLocked(e.target.checked)} defaultChecked={avatar.isLocked}/>
                            <div>
                                <button type="submit" className="btn btn-primary" style={{ marginRight: 10 }}>Submit</button>
                                <button type="button" className="btn btn-danger" onClick={() => navigate('/quiz')}>Back</button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="card-footer">Footer</div>
              </div>
            </div>
          </section>
        </div>
    );
}

export default EditAvatar