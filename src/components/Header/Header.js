import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import { motion } from 'framer-motion'
import ENSLogo from 'assets/sek9-full-logo-white.png'
import { Link, useHistory } from 'react-router-dom'
import { gql } from '@apollo/client'
import { aboutPageURL } from 'utils/utils'

import { Avatar, Layout, Menu, Button, Table, Image, Space, Input } from 'antd'
import SearchInput from '../SearchName/SearchInput'
import { useQuery } from '@apollo/client'
import mq, { useMediaMin, useMediaMax } from '../../mediaQuery'

import DefaultLogo from '../Logo'
import Search from '../SearchName/Search'
import Hamburger from './Hamburger'
import SideNav from '../SideNav/SideNav'
import Banner from '../Banner'

import { hasNonAscii } from '../../utils/utils'

const StyledBanner = styled(Banner)`
  margin-bottom: 0;
  text-align: center;
  z-index: 1;
  margin-top: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.medium`
    top: 90px;
    position: fixed;
    margin-top: 0;
  `}
`

const StyledBannerInner = styled('div')`
  max-width: 720px;
`

const Header = styled('header')`
  ${p =>
    p.isMenuOpen
      ? `
    background: #121D46;
  `
      : ''}
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
  box-shadow: 0 4px 8px 0 rgba(230, 240, 247, 0.8);
  height: 50px;
  ${mq.medium`
    box-shadow: 0 8px 24px 0 rgba(230, 240, 247, 0.8);
    height: auto;
  `}
`

const ExternalLink = styled('a')`
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
`
const SearchHeader = styled(Search)`
  margin-top: 50px;
  width: 100%;
  ${mq.medium`
    margin-top: 0;
    width: calc(100% - 200px);
  `}
`

const Logo = styled(DefaultLogo)`
  background: white;
  position: relative;
  display: flex;
  width: 100%;
  ${p =>
    p.isMenuOpen
      ? `
    opacity: 0;
  `
      : ''}

  ${mq.medium`
    opacity: 1;
    &:before {
      background: #d3d3d3;
      height: 32px;
      margin-top: 30px;
      content: '';
      width: 1px;
      right: 35px;
      top: 0;
      position: absolute;
    }
  `}
`

const LogoLarge = styled(motion.img)`
  width: 200px;
  object-fit: cover;
  margin-right: 20px;
  cursor: pointer;
  ${mq.medium`
    width: 150px;
  `}
`

const Nav = styled('nav')`
  display: flex;
  margin-left: 20px;
  justify-content: center;
  ${mq.small`
    justify-content: flex-start;
  `}
  a {
    font-weight: 300;
    color: white;
  }
`

const NavLink = styled(Link)`
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
`

const animation = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    opacity: 1,
    scale: 1
  }
}

export const GET_ACCOUNT = gql`
  query getAccounts @client {
    accounts
  }
`

export const HOME_DATA = gql`
  query getHomeData($address: string) @client {
    network
    displayName(address: $address)
    isReadOnly
    isSafeApp
  }
`

function HeaderContainer() {
  const history = useHistory()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const mediumBP = useMediaMin('medium')
  const mediumBPMax = useMediaMax('medium')
  const toggleMenu = () => setMenuOpen(!isMenuOpen)
  const { t } = useTranslation()
  const url = ''

  const {
    data: { accounts }
  } = useQuery(GET_ACCOUNT)

  const {
    data: { network, displayName, isReadOnly, isSafeApp }
  } = useQuery(HOME_DATA, {
    variables: { address: accounts?.[0] }
  })

  return (
    <>
      {/* <Header isMenuOpen={isMenuOpen}>
        <Logo isMenuOpen={isMenuOpen} />
        {mediumBP ? (
          <SearchHeader />
        ) : (
          <Hamburger isMenuOpen={isMenuOpen} openMenu={toggleMenu} />
        )}
      </Header>
      {hasNonAscii() && (
        <StyledBanner>
          <StyledBannerInner>
            <p>
              ⚠️ <strong>{t('warnings.homoglyph.title')}</strong>:{' '}
              {t('warnings.homoglyph.content')}{' '}
              <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/IDN_homograph_attack"
                rel="noreferrer"
              >
                {t('warnings.homoglyph.link')}
              </a>
              .
            </p>
          </StyledBannerInner>
        </StyledBanner>
      )}
      {mediumBPMax && (
        <>
          <SideNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <SearchHeader />
        </>
      )} */}
      <Layout.Header
        className="header"
        style={{ background: 'transparent', alignItems: 'center', height: 90 }}
      >
        <LogoLarge
          onClick={() => history.push('/')}
          initial={animation.initial}
          animate={animation.animate}
          src={ENSLogo}
          alt="SEK9 logo"
        />
        <SearchInput />
        {/* <MainPageBannerContainer>
          <DAOBannerContent />
        </MainPageBannerContainer> */}
        <div
          style={{ display: 'flex', justifyContent: 'sapce-between', flex: 1 }}
        >
          <Nav style={{ flex: 1 }}>
            {accounts?.length > 0 && !isReadOnly && (
              <NavLink
                active={url === '/address/' + accounts[0]}
                to={'/address/' + accounts[0]}
              >
                {t('c.mynames')}
              </NavLink>
            )}
            <NavLink to="/categories">{t('c.categories')}</NavLink>
            <NavLink to="/favourites">{t('c.favourites')}</NavLink>
            <NavLink to="/about">{t('c.about')}</NavLink>
            {/* <ExternalLink href={aboutPageURL()}>{t('c.about')}</ExternalLink> */}
          </Nav>
          <Space>
            <Button>Connect Wallet</Button>
            <Button>Sign up</Button>
            {/* <Input.Group compact style={{ display: 'flex' }}>
              <Input placeholder="Email Newsletter" />
            </Input.Group> */}
          </Space>
        </div>
      </Layout.Header>
    </>
  )
}

export default HeaderContainer
