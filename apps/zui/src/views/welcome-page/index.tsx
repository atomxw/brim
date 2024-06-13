import React from "react"
import {connectToLake} from "src/app/commands/connect-to-lake"
import {Subtitle} from "src/components/subtitle"
import {Title} from "src/components/title"
import styled from "styled-components"
import links from "src/config/links"
import {invoke} from "src/core/invoke"
import {chooseFiles} from "src/domain/loads/handlers"

const BG = styled.div`
  background-image: url(/welcome-page-background.svg);
  height: 100%;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 24px;
  }
`

const Card = styled.section`
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 400px;
  border-radius: 8px;
  padding: 30px 50px 50px;
  border: 1px solid var(--border-color);
`

const Actions = styled.section`
  display: flex;
  flex-flow: column;
  gap: 16px;
  width: 100%;
`

export function WelcomePage() {
  return (
    <BG>
      <Title>
        Welcome to <span>Zui</span>
      </Title>
      <Subtitle>Zed User Interface</Subtitle>
      <Card>
        <h1>Get Started</h1>
        <Actions>
          <button className="button" onClick={() => chooseFiles()}>
            Import Data
          </button>
          <button className="button" onClick={() => connectToLake.run()}>
            Connect to Lake
          </button>
          <button
            className="button"
            onClick={() => invoke("openLinkOp", links.ZUI_DOCS_ROOT)}
          >
            Documentation
          </button>
        </Actions>
      </Card>
    </BG>
  )
}
