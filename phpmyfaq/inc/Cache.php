<?php
/**
 * The PMF_Cache class implements caching factory to be used with different concrete cache services
 * 
 * PHP Version 5.2
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * @category  phpMyFAQ
 * @package   PMF_Cache
 * @author    Anatoliy Belsky <ab@php.net>
 * @copyright 2002-2012 phpMyFAQ Team
 * @license   http://www.mozilla.org/MPL/MPL-1.1.html Mozilla Public License Version 1.1
 * @link      http://www.phpmyfaq.de
 * @since     2011-09-23
 */

if (!defined('IS_VALID_PHPMYFAQ')) {
    exit();
}

/**
 * PMF_Cache
 *
 * @category  phpMyFAQ
 * @package   PMF_Cache
 * @author    Anatoliy Belsky <ab@php.net>
 * @copyright 2002-2012 phpMyFAQ Team
 * @license   http://www.mozilla.org/MPL/MPL-1.1.html Mozilla Public License Version 1.1
 * @link      http://www.phpmyfaq.de
 * @since     2011-09-23
 */
class PMF_Cache
{
    /**
     * @var PMF_Cache
     */
    protected static $instance = NULL;

    /**
     * @static
     * @param PMF_Configuration $faqConfig
     */
    public static function init(PMF_Configuration $faqConfig)
    {
        $config = array();
        if ($faqConfig->get('cache.varnishEnable')) {
            $config[VARNISH_CONFIG_PORT]    = $faqConfig->get('cache.varnishPort');
            $config[VARNISH_CONFIG_SECRET]  = $faqConfig->get('cache.varnishSecret');
            $config[VARNISH_CONFIG_TIMEOUT] = $faqConfig->get('cache.varnishTimeout');
            $config[VARNISH_CONFIG_HOST]    = $faqConfig->get('cache.varnishHost');

            self::$instance = new PMF_Cache_Varnish($config);
        } else {
            self::$instance = new PMF_Cache_Dummy($config);
        }
    }

    /**
     * @static
     * @return null|PMF_Cache
     */
    public static function getInstance()
    {
        return self::$instance;
    }
}
