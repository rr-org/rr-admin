import { useNavigate, useParams } from "react-router-dom";
import { IQuiz } from "./Quiz";
import { useEffect, useState } from "react";
import API from "@app/utils/API";
import { ContentHeader } from "@app/components";

const EditQuiz = () => {
    const [quiz, setQuiz] = useState<IQuiz>();
    const [question, setQuestion] = useState<File>()
    const [answer, setAnswer] = useState("")
    const option: string[] = []
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    async function getQuiz() {
        const response = await API.get(`quiz/${id}`);
        setQuiz(response.data.data);
    }

    async function updateQuiz() {
        try {
            await API.patch(`quiz/${id}`, {
                question: question,
                answer: answer,
                option: option
            });
            navigate('/quiz');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQuiz();
    }, [])

    return (
        <div>
          <ContentHeader title="Quiz" />
          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Quiz</h3>
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
                <div className="card-body" style={{ height: '100vh' }}>
                    {!quiz ? null : (
                        <form onSubmit={updateQuiz}>
                            <label className="form-label">Question</label>
                            <input className="form-control mb-3" type="file" onChange={(e) => setQuestion(e.target.files![0])} />
                            <label className="form-label">Answer</label>
                            <input className="form-control mb-3" value={quiz.answer} onChange={(e) => setAnswer(e.target.value)}/>
                            <label className="form-label">Option1</label>
                            <input className="form-control mb-3" value={quiz.option[0]} onChange={(e) => option[0] = e.target.value}/>
                            <label className="form-label">Option2</label>
                            <input className="form-control mb-3" value={quiz.option[1]} onChange={(e) => option[1] = e.target.value}/>
                            <label className="form-label">Option3</label>
                            <input className="form-control mb-3" value={quiz.option[2]} onChange={(e) => option[2] = e.target.value}/>
                            <label className="form-label">Option4</label>
                            <input className="form-control mb-3" value={quiz.option[3]} onChange={(e) => option[3] = e.target.value}/>
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

export default EditQuiz