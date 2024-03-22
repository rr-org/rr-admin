import { ContentHeader } from "@app/components";
import API from "@app/utils/API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IQuiz {
    id: string;
    question: string;
    answer: string;
    option: string[];
    created_at: Date;
    updated_at: Date;
}

const Quiz = () => {
    const [quiz, setQuiz] = useState<IQuiz[]>([]);
    const navigate = useNavigate();
    console.log(quiz[0])

    async function getQuiz() {
        const response = await API.get('quiz');
        setQuiz(response.data.data);
    }
    
    async function deleteQuiz(id: string) {
        if (!confirm('Are you sure you want to delete this quiz?')) {
            return false;
        }
        await API.delete(`quiz/${id}`);
        getQuiz();
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
                    <button className="btn btn-primary" onClick={() => navigate('/quiz/add')}>
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
                    {!quiz ? null : quiz.map((quiz, index) => (
                    <div className="d-flex flex-row card bg-secondary-emphasis pt-2" key={index}>
                        <div className="mx-3">
                            <p>{index + 1}</p>
                        </div>
                        <div>
                            <h5>question:</h5>
                            <audio className="mt-5" controls>
                                <source src={quiz.question} type="audio/mp3" />
                            </audio>
                        </div>
                        <div className="d-flex flex-column flex-grow-1" style={{ marginLeft: 20 }}>
                            <h5>answer: {quiz.answer}</h5>
                            <div className="d-flex flex-row">
                                <h5>option:</h5>
                                <div className="d-flex flex-column">
                                    <ul>
                                        {quiz.option.map((option, index) => (
                                            <li key={index}>{option}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column" style={{ marginRight: 20 }}>
                            <button onClick={() => navigate(`/quiz/${quiz.id}`)} className="btn btn-primary mb-2">
                                Edit
                            </button>
                            <button onClick={() => deleteQuiz(quiz.id)} className="btn btn-danger">Delete</button>
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

export default Quiz