import { ContentHeader } from "@app/components";
import API from "@app/utils/API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IAvatar {
    _id: string;
    image: string;
    price: string;
    isLocked: boolean;
    eqquiped: boolean;
    created_at: Date;
    updated_at: Date;
}

const Avatars = () => {
    const [avatars, setAvatars] = useState<IAvatar[]>([]);
    const navigate = useNavigate();

    async function getAvatars() {
        const response = await API.get('avatar');
        console.log(response.data)
        setAvatars(response.data);
    }
    
    async function deleteAvatar(id: string) {
        if (!confirm('Are you sure you want to delete this avatar?')) {
            return false;
        }
        await API.delete(`avatar/${id}`);
        getAvatars();
    }

    useEffect(() => {
        getAvatars();
    }, [])

    return (
        <div>
          <ContentHeader title="Avatars" />
          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Avatars</h3>
                  <div className="card-tools">
                    <button className="btn btn-primary" onClick={() => navigate('/avatar/add')}>
                        Add
                    </button>
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
                <div className="card-body">
                {!avatars ? null : avatars.map((avatar, index) => (
                    <div className="d-flex flex-row card bg-secondary-emphasis pt-2" key={index}>
                        <div style={{ marginLeft: 20 }}>
                            <p>{index + 1}</p>
                        </div>
                        <div>
                            <img src={avatar.image} alt="avatar" className="rounded-circle" style={{ width: 100, height: 100, margin: 15 }}/>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 mt-3" style={{ marginRight: 20 }}>
                            <h5>price: {avatar.price}</h5>
                            <h5>isLocked: {avatar.isLocked.toString()}</h5>
                            <h5>equipped: {avatar.eqquiped.toString()}</h5>
                        </div>
                        <div className="d-flex flex-column" style={{ marginRight: 20 }}>
                            <button onClick={() => navigate(`/avatar/${avatar._id}`)} className="btn btn-primary mb-2">
                                Edit
                            </button>
                            <button onClick={() => deleteAvatar(avatar._id)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
                </div>
                <div className="card-footer">Footer</div>
              </div>
            </div>
          </section>
        </div>
      );
}

export default Avatars