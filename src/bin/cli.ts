#!/usr/bin/env node
'use strict'

/**
 * nyelem
 * @author Copyright(c) 2022 by Restu wahyu saputra
 * MIT Licensed
 */

import { NyelemCommand } from '../libs/nyelemCommand'
;(async (): Promise<void> => {
  await new NyelemCommand().command()
})()
