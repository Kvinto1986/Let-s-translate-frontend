import React from 'react'

const readed = {
    opacity: '0.5'
}

const MessageInbox = ({messages, isEmpty}, ...props) => {
    return (
        <>
            <h3>Inbox</h3>
            <hr />
            <section>
                <table className="table table-borderless">
                    <tbody>
                        {
                            // isEmpty
                            !isEmpty
                                ? (
                                    <tr>
                                        <td>Here is no any messages</td>
                                    </tr>
                                )
                                : (
                                    // props.messages.map(message => {
                                    //     return (
                                    //         <tr>
                                    //             <td>
                                    //                 <input type="checkbox" />
                                    //             </td>
                                    //             <td><b>John</b></td>
                                    //             <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet soluta nostrum consectetur commodi ...</td>
                                    //             <td>5:03 am</td>
                                    //         </tr>
                                    //     )
                                    // })
                                    <>
                                        <tr>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td><b>John</b></td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet soluta nostrum consectetur commodi ...</td>
                                            <td>5:03 am</td>
                                        </tr>
                                        <tr style={readed}>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td><b>System</b></td>
                                            <td>A new translations!</td>
                                            <td>23 Jul</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td><b>Bob</b></td>
                                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet soluta nostrum consectetur commodi ...</td>
                                            <td>4 Oct 2018</td>
                                        </tr>
                                    </>
                                )
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default MessageInbox